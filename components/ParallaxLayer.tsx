"use client";

import Image from "next/image";
import { useParallax } from "./useParallax";

type ParallaxLayerProps = {
  image: string;
  imageAlt?: string;
  speed?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Pieza interna compartida por `ParallaxBanner` y `PageHead`: el fondo
 * que se desplaza con el scroll (`data-parallax`). No se expone en el
 * índice de componentes de la Fase 3 porque no es una sección por sí
 * misma, sino la implementación común del efecto parallax.
 */
export default function ParallaxLayer({
  image,
  imageAlt = "",
  speed = 0.2,
  className,
  sizes = "100vw",
  priority = false,
}: ParallaxLayerProps) {
  const ref = useParallax<HTMLDivElement>(speed);

  return (
    <div ref={ref} className={className} data-parallax={speed}>
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
