import Link from "next/link";
import styles from "./Footer.module.css";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Footer() {
  return (
    <footer className={styles.site}>
      <div className="wrap">
        <div className={styles.footGrid}>
          <Link className={styles.brand} href="/">
            <span className={styles.monogram}>GL</span>
            <span className={styles.brandName}>
              Grant Law
              <small>Abogado</small>
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
          <span>© 2026 Grant Law. Todos los derechos reservados.</span>
          <span>El contenido de este sitio es informativo y no constituye asesoría legal.</span>
        </div>
      </div>
    </footer>
  );
}
