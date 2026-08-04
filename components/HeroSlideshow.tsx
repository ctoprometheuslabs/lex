"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HeroSlideshow.module.css";

export type HeroSlide = {
  src: string;
  alt: string;
};

type HeroSlideshowProps = {
  slides: HeroSlide[];
  intervalMs?: number;
};

/**
 * Fondo del Hero: varias fotografías en loop con crossfade continuo. Todas
 * las capas se montan siempre (visibilidad vía opacidad + clase `active`) —
 * igual que `SplashScreen`/`PageTransition`/`IntroTrailer` — para que la
 * transición de opacidad siempre tenga un valor previo del cual animar.
 */
export default function HeroSlideshow({ slides, intervalMs = 6500 }: HeroSlideshowProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <div className={styles.slideshow} aria-hidden="true">
      {slides.map((slide, index) => (
        <div key={slide.src} className={index === active ? `${styles.layer} ${styles.active}` : styles.layer}>
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}
