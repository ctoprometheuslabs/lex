"use client";

import { useEffect, useRef } from "react";

/**
 * Hook compartido de parallax. Replica la fórmula del borrador:
 * offset = box.top * speed * -1, donde `box` es el rectángulo del
 * elemento PADRE del nodo que recibe el transform (igual que
 * `el.parentElement.getBoundingClientRect()` en el script original).
 *
 * Se usa tanto en `ParallaxBanner` como en `PageHead` (vía `ParallaxLayer`)
 * para no duplicar el listener de scroll ni la fórmula.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.2) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    function onScroll() {
      if (!el || !parent) return;
      const box = parent.getBoundingClientRect();
      const offset = box.top * speed * -1;
      el.style.transform = `translateY(${offset.toFixed(1)}px)`;
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return ref;
}
