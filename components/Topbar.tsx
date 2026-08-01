"use client";

import { useEffect, useState } from "react";
import styles from "./Topbar.module.css";

const NAV_LINKS = [
  { href: "#areas", label: "Áreas de práctica" },
  { href: "#perfil", label: "Perfil" },
  { href: "#proceso", label: "Cómo trabajo" },
  { href: "#contacto", label: "Contacto" },
] as const;

/**
 * Topbar de la one-page (`.topbar` en el mockup): nav de anclas a las
 * secciones de la misma página, borde inferior al hacer scroll > 20px y
 * menú hamburguesa bajo 720px.
 */
export default function Topbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const topbarClassName = scrolled ? `${styles.topbar} ${styles.scrolled}` : styles.topbar;
  const navClassName = open ? `${styles.main} ${styles.open}` : styles.main;

  return (
    <header className={topbarClassName}>
      <div className={styles.topbarInner}>
        <a className={styles.wordmark} href="#top">
          GRANT<span> LAW</span>
        </a>

        <nav className={navClassName} id="site-nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contacto" className="pill oxide">
          Agendar consulta
        </a>

        <button
          type="button"
          className={styles.menuToggle}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
