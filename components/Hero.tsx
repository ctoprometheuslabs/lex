import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import ParallaxLayer from "./ParallaxLayer";
import IntroTrailer from "./IntroTrailer";
import styles from "./Hero.module.css";

type HeroCta = {
  label: string;
  href: string;
  variant: "gold" | "light";
};

type HeroProps = {
  image: string;
  imageAlt?: string;
  speed?: number;
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
 * Hero de la portada: fotografía full-bleed con parallax sutil (oficina que
 * se abre a un horizonte urbano nocturno) y un scrim que va de azul marino
 * opaco a la izquierda —donde vive el mensaje— a transparente a la derecha,
 * dejando la imagen protagonista. Aloja al `IntroTrailer`, la secuencia
 * cinemática que precede a esta sección en la primera visita de la sesión.
 */
export default function Hero({
  image,
  imageAlt = "",
  speed = 0.18,
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

      <ParallaxLayer
        image={image}
        imageAlt={imageAlt}
        speed={speed}
        className={styles.heroBg}
        sizes="100vw"
        priority
      />

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
