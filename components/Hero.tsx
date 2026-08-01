import type { ReactNode } from "react";
import Link from "next/link";
import ParallaxLayer from "./ParallaxLayer";
import styles from "./Hero.module.css";

type HeroCta = {
  label: string;
  href: string;
  variant: "brass" | "light";
};

type HeroProps = {
  image: string;
  imageAlt?: string;
  speed?: number;
  kicker: string;
  title: ReactNode;
  lead: string;
  ctas: HeroCta[];
};

/**
 * Sección `.hero` de la portada: fondo full-bleed con parallax (vía
 * `ParallaxLayer`, mismo mecanismo que `ParallaxBanner`/`PageHead`) y un
 * marco de doble filete grabado ("EST. MMXXVI") con el mensaje principal.
 */
export default function Hero({
  image,
  imageAlt = "",
  speed = 0.25,
  kicker,
  title,
  lead,
  ctas,
}: HeroProps) {
  return (
    <section className={styles.hero}>
      <ParallaxLayer
        image={image}
        imageAlt={imageAlt}
        speed={speed}
        className={styles.heroBg}
        sizes="100vw"
        priority
      />
      <div className={styles.heroInner}>
        <div className={styles.heroFrame}>
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
        </div>
      </div>
    </section>
  );
}
