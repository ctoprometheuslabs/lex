"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Envuelve `children` y añade la clase `in` (definida en globals.css junto
 * a `.reveal`) cuando el elemento entra en el viewport, replicando el
 * IntersectionObserver del borrador. Si el usuario tiene
 * prefers-reduced-motion, ni siquiera se registra el observer: se aplica
 * `in` de inmediato.
 */
export default function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Con prefers-reduced-motion, globals.css ya fuerza opacity:1/transform:none
    // en .reveal sin necesidad de la clase "in" — no hace falta registrar el
    // observer ni tocar el estado.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = ["reveal", visible ? "in" : "", className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
