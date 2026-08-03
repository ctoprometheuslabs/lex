"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { lockScroll, unlockScroll } from "./scrollLock";
import styles from "./PageTransition.module.css";

type Phase = "idle" | "cover" | "held" | "reveal";

const COVER_MS = 480;
const MIN_HOLD_MS = 320;
const REVEAL_MS = 620;
const FALLBACK_MS = 3000;

/**
 * Cortina de transición entre páginas: distinta de `SplashScreen` (que solo
 * corre en la primera carga). Intercepta clics en enlaces internos, cubre la
 * pantalla deslizándose desde abajo, navega mientras está cubierta y luego
 * continúa el mismo barrido hacia arriba hasta salir por completo,
 * revelando la página ya montada. Un solo montaje persistente en el layout
 * raíz, que no se remonta entre navegaciones.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");

  const timers = useRef<number[]>([]);
  const pendingHref = useRef<string | null>(null);
  const targetPathname = useRef<string | null>(null);
  const lockedRef = useRef(false);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const schedule = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  // Cuando el pathname cambia y coincide con el destino que estábamos
  // esperando, arranca la revelación (con un mínimo de cobertura para que
  // no se sienta como un parpadeo).
  useEffect(() => {
    if (phase === "held" && targetPathname.current === pathname) {
      targetPathname.current = null;
      clearTimers();
      setPhase("reveal");
      schedule(() => {
        setPhase("idle");
        if (lockedRef.current) {
          lockedRef.current = false;
          unlockScroll();
        }
      }, REVEAL_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (anchor.hasAttribute("download") || anchor.dataset.noTransition !== undefined) return;
      if (anchor.target && anchor.target !== "_self") return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // ancla o query en la misma página

      event.preventDefault();

      if (phase !== "idle") return; // ya hay una transición en curso

      pendingHref.current = url.pathname + url.search + url.hash;
      targetPathname.current = url.pathname;

      lockScroll();
      lockedRef.current = true;
      setPhase("cover");

      schedule(() => {
        setPhase("held");
        if (pendingHref.current) {
          router.push(pendingHref.current);
        }
        // Resguardo: si el pathname nunca coincide (navegación bloqueada,
        // ruta externa reescrita, etc.), revela igual para no dejar la
        // cortina cubriendo la pantalla.
        schedule(() => {
          setPhase((current) => {
            if (current === "held") {
              return "reveal";
            }
            return current;
          });
        }, FALLBACK_MS);
      }, COVER_MS + MIN_HOLD_MS);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, router]);

  useEffect(() => {
    if (phase === "reveal") {
      const t = window.setTimeout(() => {
        setPhase("idle");
        if (lockedRef.current) {
          lockedRef.current = false;
          unlockScroll();
        }
      }, REVEAL_MS);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => clearTimers, []);

  if (phase === "idle") return null;

  const stateClass =
    phase === "cover"
      ? styles.cover
      : phase === "held"
        ? styles.held
        : styles.reveal;

  return (
    <div className={`${styles.curtain} ${stateClass}`} aria-hidden="true">
      <div className={styles.sweep} />
      <div className={styles.center}>
        <span className={styles.mark}>G|L</span>
        <span className={styles.line} />
      </div>
    </div>
  );
}
