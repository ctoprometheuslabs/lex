import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import HeroSlideshow, { type HeroSlide } from "./HeroSlideshow";
import IntroTrailer from "./IntroTrailer";
import styles from "./Hero.module.css";

type HeroCta = {
  label: string;
  href: string;
  variant: "gold" | "light";
};

type HeroProps = {
  images: HeroSlide[];
  kicker: string;
  title: ReactNode;
  lead: string;
  ctas: HeroCta[];
  tags: string[];
  caption: string;
  /** Retrato para la 1.ª diapositiva del Intro Trailer; si se omite, no se monta la intro. */
  introPhoto?: StaticImageData;
};

/**
 * Hero de la portada: slideshow full-bleed en loop (`HeroSlideshow`) con un
 * scrim que va de azul marino opaco a la izquierda —donde vive el mensaje—
 * a transparente a la derecha, dejando la fotografía protagonista. Aloja al
 * `IntroTrailer`, la secuencia cinemática que precede a esta sección en la
 * primera visita de la sesión.
 */
export default function Hero({
  images,
  kicker,
  title,
  lead,
  ctas,
  tags,
  caption,
  introPhoto,
}: HeroProps) {
  return (
    <section className={styles.hero}>
      {introPhoto ? <IntroTrailer photo={introPhoto} /> : null}

      <HeroSlideshow slides={images} />

      <div className={styles.heroInner}>
        <p className={styles.kicker}>{kicker}</p>
        <h1>{title}</h1>
        <p className={styles.lead}>{lead}</p>
        <div className={styles.heroCtas}>
          {ctas.map((cta) => (
            <Link key={cta.label} href={cta.href} className={`btn btn-${cta.variant}`}>
              {cta.label}
            </Link>
          ))}
        </div>
        <ul className={styles.tags}>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>

      <p className={styles.caption}>{caption}</p>
    </section>
  );
}
