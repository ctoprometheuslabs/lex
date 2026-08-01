import styles from "./Footer.module.css";

const FOOTER_LINKS = [
  { href: "#areas", label: "Áreas" },
  { href: "#perfil", label: "Perfil" },
  { href: "#proceso", label: "Cómo trabajo" },
  { href: "#contacto", label: "Contacto" },
] as const;

export default function Footer() {
  return (
    <footer className={styles.site}>
      <div className="wrap">
        <div className={styles.foot}>
          <span className={styles.wordmark}>
            GRANT<span className={styles.oxideText}> LAW</span>
          </span>
          <div className={styles.footLinks}>
            {FOOTER_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <span>© 2026 Grant Law. Todos los derechos reservados.</span>
        </div>
        <p className={styles.footLegal}>
          El contenido de este sitio es informativo y no constituye asesoría legal.
        </p>
      </div>
    </footer>
  );
}
