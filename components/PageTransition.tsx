"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { lockScroll, unlockScroll } from "./scrollLock";
import styles from "./PageTransition.module.css";

type Phase = "idle" | "cover" | "held" | "reveal";

const COVER_MS = 550;
// Tiempo mínimo ya cubierta antes de poder revelar, independiente de cuán
// rápido responda la navegación (rutas precargadas pueden resolver en
// pocos ms). Sin este mínimo el título apenas alcanza a asomar.
const MIN_HOLD_MS = 1150;
const REVEAL_MS = 680;
const FALLBACK_MS = 4000;

// Mismas etiquetas que el nav del Topbar; se muestran dentro de la cortina
// para anunciar hacia dónde se dirige la navegación.
const PAGE_NAMES: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/practice-areas": "Practice Areas",
  "/experience": "Experience",
  "/contact": "Contact",
};

function labelFor(pathname: string): string {
  if (PAGE_NAMES[pathname]) return PAGE_NAMES[pathname];
  const last = pathname.split("/").filter(Boolean).pop();
  if (!last) return "Home";
  return last
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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
  const [destination, setDestination] = useState("");

  const timers = useRef<number[]>([]);
  const pendingHref = useRef<string | null>(null);
  const targetPathname = useRef<string | null>(null);
  const lockedRef = useRef(false);
  const phaseRef = useRef<Phase>("idle");
  const pathReadyRef = useRef(false);
  const holdReadyRef = useRef(false);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const schedule = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Revela solo cuando se cumplen las dos condiciones: la navegación ya
  // aterrizó en el destino Y la cortina lleva cubierta al menos MIN_HOLD_MS
  // (lo que tarde más). Así el título siempre alcanza a mostrarse, incluso
  // en rutas precargadas que resuelven casi al instante.
  const tryReveal = useCallback(() => {
    if (phaseRef.current !== "held" || !pathReadyRef.current || !holdReadyRef.current) return;
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
  }, []);

  useEffect(() => {
    if (phase === "held" && targetPathname.current === pathname) {
      pathReadyRef.current = true;
      tryReveal();
    }
  }, [pathname, phase, tryReveal]);

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
      pathReadyRef.current = false;
      holdReadyRef.current = false;
      setDestination(labelFor(url.pathname));

      lockScroll();
      lockedRef.current = true;
      setPhase("cover");

      schedule(() => {
        setPhase("held");
        if (pendingHref.current) {
          router.push(pendingHref.current);
        }

        schedule(() => {
          holdReadyRef.current = true;
          tryReveal();
        }, MIN_HOLD_MS);

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
      }, COVER_MS);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [phase, router, tryReveal]);

  useEffect(() => clearTimers, []);

  // Se monta una sola vez y permanece siempre en el árbol (en reposo, fuera
  // de pantalla vía transform) para que el primer clic anime igual que los
  // siguientes: si se desmontara en "idle", el próximo montaje aplicaría la
  // clase "cover" desde el instante de inserción y el navegador no tendría
  // un valor previo desde el cual transicionar (la cortina "aparecería" de
  // golpe en vez de deslizarse).
  const stateClass =
    phase === "cover" ? styles.cover : phase === "held" ? styles.held : phase === "reveal" ? styles.reveal : "";

  return (
    <div className={`${styles.curtain} ${stateClass}`} aria-hidden="true">
      <div className={styles.sweep} />
      <div className={styles.center}>
        <span className={styles.mark}>
          G<span className={styles.markBar} />L
        </span>
        <span className={styles.pageName}>{destination}</span>
        <span className={styles.line} />
      </div>
    </div>
  );
}
