import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import ParallaxLayer from "./ParallaxLayer";
import styles from "./Hero.module.css";

type HeroCta = {
  label: string;
  href: string;
  variant: "brass" | "light";
};

type HeroPortrait = {
  src: StaticImageData;
  alt: string;
};

type HeroProps = {
  image: string;
  imageAlt?: string;
  speed?: number;
  kicker: string;
  title: ReactNode;
  lead: string;
  ctas: HeroCta[];
  portrait: HeroPortrait;
};

/**
 * Sección `.hero` de la portada: fondo full-bleed con parallax (vía
 * `ParallaxLayer`, mismo mecanismo que `ParallaxBanner`/`PageHead`) sobre el
 * que se despliega un layout de dos columnas — mensaje principal a la
 * izquierda, retrato con marco de doble filete a la derecha. En móvil se
 * apila con el retrato primero.
 */
export default function Hero({
  image,
  imageAlt = "",
  speed = 0.25,
  kicker,
  title,
  lead,
  ctas,
  portrait,
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
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
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
          <div className={styles.heroPortrait}>
            <div className={styles.portraitFrame}>
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(max-width: 960px) 70vw, 400px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
