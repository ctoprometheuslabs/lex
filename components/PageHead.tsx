import type { ReactNode } from "react";
import ParallaxLayer from "./ParallaxLayer";
import styles from "./PageHead.module.css";

type PageHeadProps = {
  image: string;
  imageAlt?: string;
  crumb: string;
  /** Título de la cabecera; admite texto simple o JSX (p. ej. <em>). */
  title?: ReactNode;
  /** Alternativa a `title` cuando se necesita marcado más rico. */
  children?: ReactNode;
};

/**
 * Cabecera interior de página (`.page-head` en el borrador). Comparte el
 * mecanismo de parallax con `ParallaxBanner` a través de `ParallaxLayer`
 * para no duplicar el listener de scroll, aunque su layout (full-bleed
 * superior, opacidad reducida del fondo, degradado propio) es distinto.
 */
export default function PageHead({ image, imageAlt = "", crumb, title, children }: PageHeadProps) {
  const heading = children ?? title;

  return (
    <div className={styles.pageHead}>
      <ParallaxLayer
        image={image}
        imageAlt={imageAlt}
        speed={0.2}
        className={styles.pbg}
        priority
      />
      <div className="wrap">
        <p className={styles.crumb}>{crumb}</p>
        <h1>{heading}</h1>
      </div>
    </div>
  );
}
