import Image from "next/image";
import styles from "./Profile.module.css";

type Credential = {
  label: string;
  value: string;
};

type ProfileProps = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  name: string;
  role: string;
  paragraphs: string[];
  credentials: Credential[];
};

/**
 * Perfil destacado del socio fundador (`.profile-grid`/`.portrait`/
 * `.profile-copy` en el borrador, portada de `/equipo`).
 */
export default function Profile({
  image,
  imageAlt,
  eyebrow,
  name,
  role,
  paragraphs,
  credentials,
}: ProfileProps) {
  return (
    <div className={styles.profileGrid}>
      <div className={styles.portrait}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 960px) 90vw, 420px"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className={styles.profileCopy}>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{name}</h2>
        <p className={styles.role}>{role}</p>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <ul className={styles.creds}>
          {credentials.map((credential) => (
            <li key={credential.label}>
              <b>{credential.label}</b>
              <span>{credential.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
