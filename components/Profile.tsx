import Image from "next/image";
import Reveal from "./Reveal";
import styles from "./Profile.module.css";

type Credential = {
  label: string;
  value: string;
};

type ProfileProps = {
  image: string;
  imageAlt: string;
  credentials: Credential[];
};

/**
 * Sección de perfil (`.profile` en el mockup): retrato en escala de grises
 * parcial + copy en primera persona + lista de credenciales con hairlines.
 */
export default function Profile({ image, imageAlt, credentials }: ProfileProps) {
  return (
    <section className={styles.profile} id="perfil">
      <div className="wrap">
        <div className={styles.profileGrid}>
          <Reveal className={styles.portrait}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1000px) 90vw, 440px"
              style={{ objectFit: "cover" }}
            />
          </Reveal>
          <Reveal className={styles.profileCopy}>
            <p className="label">Perfil</p>
            <h2>Un solo responsable de su caso, de principio a fin.</h2>
            <p>
              Con más de quince años de ejercicio en asesoría corporativa y litigios de alta
              complejidad, decidí ejercer de forma independiente para ofrecer lo que las grandes
              estructuras no siempre permiten: atención directa, estrategia a la medida y
              honorarios transparentes.
            </p>
            <p>
              Mi regla de oro es decirle la verdad sobre su caso, aunque no sea lo que quiere
              escuchar. Esa franqueza es la base de una defensa seria.
            </p>
            <ul className={styles.creds}>
              {credentials.map((credential) => (
                <li key={credential.label}>
                  <b>{credential.label}</b>
                  <span>{credential.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
