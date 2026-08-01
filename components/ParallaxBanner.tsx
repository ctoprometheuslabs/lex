"use client";

import type { ReactNode } from "react";
import ParallaxLayer from "./ParallaxLayer";
import styles from "./ParallaxBanner.module.css";

type ParallaxBannerProps = {
  image: string;
  imageAlt?: string;
  speed?: number;
  className?: string;
  children: ReactNode;
};

export default function ParallaxBanner({
  image,
  imageAlt = "",
  speed = 0.2,
  className,
  children,
}: ParallaxBannerProps) {
  const wrapperClassName = className
    ? `${styles.parallaxBanner} ${className}`
    : styles.parallaxBanner;

  return (
    <div className={wrapperClassName}>
      <ParallaxLayer image={image} imageAlt={imageAlt} speed={speed} className={styles.pbg} />
      <div className={styles.pbInner}>{children}</div>
    </div>
  );
}
