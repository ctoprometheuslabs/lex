import Image from "next/image";
import Reveal from "./Reveal";
import styles from "./PhotoBand.module.css";

type PhotoBandProps = {
  image: string;
  imageAlt: string;
};

/**
 * Banda fotográfica full-bleed simple (`.photo-band` en el mockup).
 */
export default function PhotoBand({ image, imageAlt }: PhotoBandProps) {
  return (
    <Reveal className={styles.photoBand}>
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        loading="lazy"
      />
    </Reveal>
  );
}
