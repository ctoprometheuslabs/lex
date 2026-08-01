import Link from "next/link";
import styles from "./Footer.module.css";

const FOOTER_LINKS = [
  { href: "/firma", label: "La firma" },
  { href: "/areas", label: "Áreas de práctica" },
  { href: "/equipo", label: "Equipo" },
  { href: "/contacto", label: "Contacto" },
] as const;

export default function Footer() {
  return (
    <footer className={styles.site}>
      <div className="wrap">
        <div className={styles.footGrid}>
          <Link className={styles.brand} href="/">
            <span className={styles.monogram}>L·A</span>
            <span className={styles.brandName}>
              Lex &amp; Asociados
              <small>Estudio Jurídico</small>
            </span>
          </Link>
          <div className={styles.footLinks}>
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.footLegal}>
          <span>© 2026 Lex &amp; Asociados. Todos los derechos reservados.</span>
          <span>El contenido de este sitio es informativo y no constituye asesoría legal.</span>
        </div>
      </div>
    </footer>
  );
}
