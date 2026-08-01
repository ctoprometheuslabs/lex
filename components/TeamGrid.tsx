import Image from "next/image";
import Link from "next/link";
import styles from "./TeamGrid.module.css";

type TeamMember = {
  photo: string;
  name: string;
  role: string;
  bio?: string;
};

type TeamGridProps = {
  members: TeamMember[];
  /**
   * Cuando se define, cada tarjeta se renderiza como enlace hacia esta
   * ruta (uso en la portada de inicio, que enlaza a /equipo). Si se omite,
   * se renderiza como `<div>` sin enlace (uso en la página de equipo).
   */
  href?: string;
};

export default function TeamGrid({ members, href }: TeamGridProps) {
  return (
    <div className={styles.teamGrid}>
      {members.map((member) => {
        const content = (
          <>
            <span className={styles.photo}>
              <Image
                src={member.photo}
                alt={`${member.name} — ${member.role}`}
                fill
                sizes="(max-width: 820px) 100vw, (max-width: 1020px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </span>
            <h3>{member.name}</h3>
            <span className={styles.role}>{member.role}</span>
            {member.bio ? <p className={styles.bio}>{member.bio}</p> : null}
          </>
        );

        return href ? (
          <Link key={member.name} className={styles.member} href={href}>
            {content}
          </Link>
        ) : (
          <div key={member.name} className={styles.member}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
