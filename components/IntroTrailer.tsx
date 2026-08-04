"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { lockScroll, unlockScroll } from "./scrollLock";
import styles from "./IntroTrailer.module.css";

const SEEN_KEY = "gl-intro-seen";
const CITY_IMAGE =
  "https://images.unsplash.com/photo-1641335469533-89ad14fd2ec5?auto=format&fit=crop&w=1800&q=80";

type IntroTrailerProps = {
  /** Retrato profesional que protagoniza la primera diapositiva. */
  photo: StaticImageData;
};

/**
 * Intro cinemática de la portada (referencia: demo "Doan Law Office" del
 * cliente). Secuencia: splash con logo (lo cubre `SplashScreen`) → retrato
 * profesional con panel de texto → panorámica nocturna de la ciudad → se
 * desvanece revelando el hero. Con botón SKIP INTRO y guiones de progreso.
 * Se reproduce una vez por sesión (sessionStorage) y nunca con
 * `prefers-reduced-motion` activo.
 */
export default function IntroTrailer({ photo }: IntroTrailerProps) {
  const [active, setActive] = useState(false);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const timers = useRef<number[]>([]);
  const startedRef = useRef(false);
  const doneRef = useRef(false);
  const lockedRef = useRef(false);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // sessionStorage bloqueado: se reproduce igual.
    }
    if (seen) return;

    // Decisión que solo puede tomarse en el cliente (matchMedia/sessionStorage
    // no existen en el render del servidor): activar la intro tras montar es
    // el propio propósito de este efecto, no un derivado de props/estado.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(true);
    lockScroll();
    lockedRef.current = true;

    const schedule = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms));
    };
    const release = () => {
      if (lockedRef.current) {
        lockedRef.current = false;
        unlockScroll();
      }
    };
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // sin persistencia: la intro volvería a verse en la próxima visita.
      }
      setLeaving(true);
      schedule(() => {
        setActive(false);
        release();
      }, 1000);
    };
    finishRef.current = finish;

    const start = () => {
      if (startedRef.current || doneRef.current) return;
      startedRef.current = true;
      setStarted(true);
      schedule(() => setCurrent(1), 4600);
      schedule(finish, 9200);
    };

    if (document.getElementById("gl-splash")) {
      // Carga completa: el splash hace de primera diapositiva (logo) y avisa
      // cuando empieza a desvanecerse. Timeout de resguardo por si el evento
      // no llega.
      window.addEventListener("gl:splash-done", start, { once: true });
      schedule(start, 3400);
    } else {
      // Navegación interna hacia la portada: no hay splash, arranca directo.
      schedule(start, 400);
    }

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      window.removeEventListener("gl:splash-done", start);
      startedRef.current = false;
      release();
    };
  }, []);

  if (!active) return null;

  const dashIndex = !started ? 0 : current === 0 ? 1 : 2;
  const photoActive = started && current === 0;
  const cityActive = current === 1;

  return (
    <>
      <div className={leaving ? `${styles.trailer} ${styles.leaving}` : styles.trailer}>
        <div
          className={[
            styles.slide,
            styles.slidePhoto,
            current === 0 ? styles.shown : "",
            photoActive ? styles.activeSlide : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles.photoMedia}>
            <Image
              src={photo}
              alt=""
              fill
              priority
              sizes="(max-width: 820px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.photoPanel}>
            <p className={styles.slideEyebrow}>Atención personal · Juicio claro</p>
            <p className={styles.slideTitle}>La estrategia comienza por comprender.</p>
            <p className={styles.slideLead}>
              Acompañamiento directo en decisiones empresariales, patrimoniales y de inversión.
            </p>
          </div>
        </div>

        <div
          className={[
            styles.slide,
            styles.slideCity,
            cityActive ? `${styles.shown} ${styles.activeSlide}` : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles.cityMedia}>
            <Image
              src={CITY_IMAGE}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.cityShade} />
          <div className={styles.cityText}>
            <p className={styles.slideEyebrow}>Grant Law · Abogado</p>
            <p className={styles.slideTitleBig}>
              Donde la estrategia jurídica define el resultado.
            </p>
          </div>
        </div>

        <div className={styles.dashes} aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={i === dashIndex ? `${styles.dash} ${styles.dashActive}` : styles.dash}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className={leaving ? `${styles.skip} ${styles.skipHidden}` : styles.skip}
        onClick={() => finishRef.current()}
      >
        Skip intro
      </button>
    </>
  );
}
