"use client";

import { useEffect, useRef, useState } from "react";
import Monogram from "./Monogram";
import { lockScroll, unlockScroll } from "./scrollLock";
import styles from "./SplashScreen.module.css";

/**
 * Pantalla de carga de la primera visita: azul marino profundo con el
 * monograma centrado, wordmark con tracking que se expande y tagline.
 * Se renderiza visible desde el servidor para cubrir la página antes de
 * hidratar (sin destello de contenido). Al iniciar su desvanecimiento emite
 * `gl:splash-done` para que el IntroTrailer de la portada tome el relevo
 * como si fuera la misma secuencia.
 */
export default function SplashScreen() {
  const [phase, setPhase] = useState<"show" | "fade" | "done">("show");
  const lockedRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduced ? 200 : 1600;
    const fade = reduced ? 150 : 750;

    lockScroll();
    lockedRef.current = true;
    const release = () => {
      if (lockedRef.current) {
        lockedRef.current = false;
        unlockScroll();
      }
    };

    const t1 = window.setTimeout(() => {
      setPhase("fade");
      window.dispatchEvent(new Event("gl:splash-done"));
    }, hold);
    const t2 = window.setTimeout(() => {
      setPhase("done");
      release();
    }, hold + fade);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      release();
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      id="gl-splash"
      className={phase === "fade" ? `${styles.splash} ${styles.fade}` : styles.splash}
      aria-hidden="true"
    >
      <div className={styles.inner}>
        <Monogram className={styles.mark} />
        <p className={styles.wordmark}>Grant Law</p>
        <p className={styles.tagline}>Asesoría legal estratégica</p>
      </div>
    </div>
  );
}
