import Image from "next/image";
import Reveal from "./Reveal";
import styles from "./Hero.module.css";

type HeroProps = {
  image: string;
  imageAlt: string;
};

/**
 * Hero tipográfico de la one-page (`.hero` en el mockup): sin parallax,
 * H1 gigante con grid-lines verticales de fondo y foto full-bleed debajo.
 */
export default function Hero({ image, imageAlt }: HeroProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.gridLines} aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div className={`wrap ${styles.heroInner}`}>
        <Reveal>
          <p className={styles.kicker}>
            Abogado · <b>Derecho corporativo — Litigios — Contratos</b>
          </p>
        </Reveal>
        <Reveal>
          <h1 className={styles.h1}>
            Grant
            <br />
            <span className={styles.law}>Law</span>
          </h1>
        </Reveal>
        <Reveal className={styles.heroSub}>
          <h2>Asesoría legal con criterio. Representación con resultados.</h2>
          <div className={styles.side}>
            <p>
              Atiendo personalmente cada caso: análisis riguroso, comunicación directa y una
              estrategia diseñada para su situación — no una plantilla.
            </p>
            <div className={styles.heroCtas}>
              <a href="#contacto" className="pill oxide">
                Agendar una consulta
              </a>
              <a href="#areas" className="pill ghost">
                Áreas de práctica
              </a>
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal className={styles.heroPhoto}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </Reveal>
    </div>
  );
}
