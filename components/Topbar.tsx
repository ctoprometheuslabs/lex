"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Topbar.module.css";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/firma", label: "La firma" },
  { href: "/areas", label: "Áreas de práctica" },
  { href: "/equipo", label: "Equipo" },
  { href: "/contacto", label: "Contacto" },
] as const;

export default function Topbar() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Clase .solid al hacer scroll > 40px (equivalente a onScroll() del borrador).
  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil al navegar (equivalente a nav.classList.remove('open') en
  // render()). Se ajusta durante el render, no en un efecto, siguiendo el patrón
  // de React para derivar estado a partir de un cambio de prop.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const navClassName = open ? `${styles.main} ${styles.open}` : styles.main;
  const topbarClassName = solid ? `${styles.topbar} ${styles.solid}` : styles.topbar;

  return (
    <header className={topbarClassName}>
      <div className={styles.topbarInner}>
        <Link className={styles.brand} href="/">
          <span className={styles.monogram}>L·A</span>
          <span className={styles.brandName}>
            Lex &amp; Asociados
            <small>Estudio Jurídico</small>
          </span>
        </Link>

        <nav className={navClassName} id="site-nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? styles.active : undefined}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contacto" className="btn btn-brass" style={{ padding: "12px 24px" }}>
            Agendar consulta
          </Link>
        </nav>

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
