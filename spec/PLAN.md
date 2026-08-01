# PLAN.md — Migración a Next.js 16 y Deploy en Vercel

**Proyecto:** Sitio web estudio jurídico (Lex & Asociados)
**Objetivo:** Migrar el borrador estático (`index.html`, router por hash) a **Next.js 16 (App Router, TypeScript, Turbopack)** con páginas reales, formulario de contacto 100% funcional vía SMTP de Gmail, y publicarlo en **Vercel** con el dominio del cliente.
**Plazo total estimado:** 1–2 días hábiles (≈ 10–14 h de trabajo efectivo).

## Versiones objetivo

| Herramienta | Versión | Nota |
|---|---|---|
| Next.js | `16.2.x` (última estable vía `create-next-app@latest`) | Active LTS, Turbopack por defecto |
| React | `19.2.x` | Incluida por Next 16 |
| Node.js | `22.x LTS` | Requerido local y en Vercel |
| TypeScript | La que instale el scaffold (5.x) | Modo estricto |
| nodemailer | Última estable + `@types/nodemailer` | Única dependencia extra aprobada |

**Regla de estilos:** CSS global + CSS Modules propios (sin Tailwind). El diseño ya existe en `index.html` y se migra 1:1; agregar un framework de CSS solo introduce riesgo.

---

## FASE 0 — Prerrequisitos (15 min) · responsable: usuario

| # | Acción | Hecho cuando |
|---|---|---|
| 0.1 | Verificar `node -v` ≥ 22, cuenta Vercel activa, repo git creado | Los tres confirmados |
| 0.2 | Tener a mano la App Password de Google de `cto@prometheuslabs.com.co` (NO compartirla en el chat; se usará solo en `.env.local` y en Vercel) | Password disponible localmente |

---

## FASE 1 — Scaffold del proyecto (30 min) · agente: `architect` dirige, `frontend` ejecuta

| # | Paso | Detalle | Hecho cuando |
|---|---|---|---|
| 1.1 | Crear proyecto | `npx create-next-app@latest lex-asociados --typescript --app --eslint --no-tailwind --src-dir=false --import-alias "@/*"` | `npm run dev` levanta la página por defecto |
| 1.2 | Limpieza | Borrar assets/estilos demo del scaffold | Home en blanco sin errores |
| 1.3 | Higiene del repo | `.gitignore` incluye `.env*` (verificar); crear `.env.example` con `SMTP_USER=`, `SMTP_APP_PASSWORD=`, `CONTACT_TO=` | `git status` no muestra ningún `.env` real |
| 1.4 | Mover archivos del proyecto | `CLAUDE.md`, `README.md`, `.claude/agents/*` y el borrador `index.html` (como `docs/reference/index.html`, referencia visual canónica) | Todo commiteado en el primer commit |

---

## FASE 2 — Sistema de diseño base (1 h) · agente: `frontend`

| # | Paso | Detalle | Hecho cuando |
|---|---|---|---|
| 2.1 | `app/globals.css` | Portar TODAS las variables de `:root` del borrador (`--rosewood`, `--brass`, `--ivory`, etc.), reset, utilidades (`.wrap`, `.eyebrow`, `.btn*`, `.reveal`) y breakpoints (1020/960/820px) | Variables idénticas al borrador |
| 2.2 | Fuentes con `next/font` | `Libre_Caslon_Text` y `Libre_Franklin` desde `next/font/google` en `app/layout.tsx`, expuestas como variables CSS (`--serif`, `--sans`). Elimina el `<link>` a Google Fonts (mejor rendimiento y sin FOUT) | Tipografías se ven idénticas al borrador |
| 2.3 | Metadata base | `metadata` en `layout.tsx`: título con template (`%s · Lex & Asociados`), description, `lang="es"` | Visible en el `<head>` |

---

## FASE 3 — Componentes compartidos (1.5 h) · agente: `frontend`

Todos en `components/`, tipados. Los interactivos llevan `"use client"`; el resto son Server Components.

| # | Componente | Tipo | Origen en el borrador |
|---|---|---|---|
| 3.1 | `Topbar.tsx` | client (scroll + menú móvil; links activos con `usePathname`) | `.topbar` + nav |
| 3.2 | `Footer.tsx` | server | `footer.site` |
| 3.3 | `Reveal.tsx` | client (IntersectionObserver; respeta `prefers-reduced-motion`) | `.reveal` |
| 3.4 | `ParallaxBanner.tsx` | client (patrón `data-parallax` con transform; nunca `background-attachment: fixed`) | `.parallax-banner` |
| 3.5 | `PageHead.tsx` | server (cabecera interior con imagen + crumb) | `.page-head` |
| 3.6 | `StatsBar.tsx`, `PracticeIndex.tsx`, `TeamGrid.tsx`, `Quotes.tsx`, `CtaBand.tsx` | server | secciones respectivas |

**Hecho cuando:** cada componente renderiza pixel-perfect contra `docs/reference/index.html` en los 3 breakpoints.

---

## FASE 4 — Migración de páginas (2–3 h) · agente: `frontend`

Cada página es una ruta real (adiós hash router → mejor SEO). Contenido: copiar textos del borrador tal cual.

| # | Ruta | Archivo | Secciones |
|---|---|---|---|
| 4.1 | `/` | `app/page.tsx` | Hero parallax, StatsBar, tarjetas de áreas, banner promesa, preview equipo, testimonios, CTA |
| 4.2 | `/firma` | `app/firma/page.tsx` | PageHead, split historia, 3 valores, banner CTA |
| 4.3 | `/areas` | `app/areas/page.tsx` | PageHead, índice romano I–V, CTA |
| 4.4 | `/equipo` | `app/equipo/page.tsx` | PageHead, perfil fundador, TeamGrid, CTA |
| 4.5 | `/contacto` | `app/contacto/page.tsx` | PageHead, datos de contacto + `<ContactForm />` (se conecta en Fase 6) |
| 4.6 | Imágenes | Placeholders Unsplash migrados a `next/image` (`remotePatterns` para `images.unsplash.com` en `next.config.ts`) con `alt` y `sizes` correctos | `next build` sin warnings de imágenes |
| 4.7 | Metadata por página | `export const metadata` en cada `page.tsx` (title + description únicos) | 5 títulos distintos en el navegador |

**Hecho cuando:** navegación completa entre las 5 rutas, sin errores de hidratación en consola, visual idéntico al borrador.

---

## FASE 5 — Backend de correo (1.5–2 h) · agente: `backend`

| # | Paso | Detalle | Hecho cuando |
|---|---|---|---|
| 5.1 | Instalar | `npm i nodemailer && npm i -D @types/nodemailer` | En `package.json` |
| 5.2 | `lib/mailer.ts` | Transporte único: `smtp.gmail.com:465`, `secure: true`, auth desde `process.env` | Compila; cero credenciales en código |
| 5.3 | `app/api/contact/route.ts` | `export const runtime = "nodejs"`; solo POST; validación server-side (nombre, email, teléfono opcional, área en lista blanca, mensaje ≤ 5000); sanitización HTML; honeypot; rate-limit básico por IP | `curl` con payload inválido → 400 con errores por campo |
| 5.4 | Correos | 2 envíos por consulta: (a) notificación a `CONTACT_TO` con `replyTo` del consultante, asunto `Nueva consulta — [Área] — [Nombre]`; (b) confirmación al consultante. Plantillas HTML inline con paleta del sitio, tono formal | Ambos correos llegan en prueba local |
| 5.5 | Prueba local real | Usuario crea `.env.local` con sus credenciales reales y `CONTACT_TO=cto@prometheuslabs.com.co`; enviar formulario de prueba | Correo real recibido en la casilla del desarrollador |

---

## FASE 6 — Formulario en el cliente (1 h) · agente: `frontend` (contrato definido por `backend`)

| # | Paso | Detalle | Hecho cuando |
|---|---|---|---|
| 6.1 | `components/ContactForm.tsx` | Client component; mismos campos y estilos del borrador; campo honeypot oculto | Visual idéntico |
| 6.2 | Estados | `fetch("/api/contact")` con estados: enviando (botón deshabilitado), éxito (caja `.form-ok`), error de validación (mensajes por campo), error de servidor (mensaje genérico sobrio) | Los 4 estados verificados a mano |
| 6.3 | Accesibilidad | Labels asociados, `aria-live` para el mensaje de resultado, focus visible | Navegable solo con teclado |

---

## FASE 7 — SEO y pulido (45 min) · agente: `frontend`

| # | Paso | Detalle |
|---|---|---|
| 7.1 | `app/sitemap.ts` y `app/robots.ts` | 5 rutas; robots permitiendo todo |
| 7.2 | Open Graph | `openGraph` en metadata (título, description, locale `es`) |
| 7.3 | Favicon | Monograma como `app/icon.svg` |
| 7.4 | 404 | `app/not-found.tsx` con estilo de la marca y link a inicio |

---

## FASE 8 — QA (1 h) · agentes: `frontend` + `backend`, aprueba `architect`

Checklist bloqueante — nada se despliega sin esto:

- [ ] `npm run build` sin errores ni warnings relevantes
- [ ] 5 rutas navegables; visual fiel al borrador en 375px, 768px, 1440px
- [ ] Parallax y reveals desactivados con `prefers-reduced-motion: reduce`
- [ ] Formulario: 4 estados funcionando + correos reales llegando
- [ ] `grep` de seguridad: cero credenciales/hardcodes; `.env*` fuera de git
- [ ] Lighthouse (móvil) ≥ 90 en Performance, Accessibility y SEO

---

## FASE 9 — Deploy en Vercel (45 min) · agente: `architect` dirige, usuario ejecuta credenciales

| # | Paso | Detalle | Hecho cuando |
|---|---|---|---|
| 9.1 | Deploy preview | `vercel` (o conectar repo GitHub → deploy automático) | URL `*.vercel.app` funcionando |
| 9.2 | Variables de entorno | Dashboard → Settings → Environment Variables: `SMTP_USER`, `SMTP_APP_PASSWORD`, `CONTACT_TO` (Production + Preview). Redeploy | Formulario envía correos desde la URL de preview |
| 9.3 | **Demo con el cliente** | Enviar URL de preview al cliente; que pruebe el formulario → el correo llega a `CONTACT_TO` (casilla del desarrollador) = prueba en vivo de que todo funciona | Cliente confirma y aprueba |
| 9.4 | Dominio | Cliente compra el dominio (a su nombre); Settings → Domains → agregar dominio → configurar DNS (`A`/`CNAME`) según instrucciones de Vercel; HTTPS automático | Sitio en `https://dominiodelcliente.com` |
| 9.5 | Deploy producción | `vercel --prod` | Producción en el dominio final |

---

## FASE 10 — Entrega y traspaso (30 min) · agente: `architect` + usuario

| # | Paso | Detalle |
|---|---|---|
| 10.1 | Contenido final | Reemplazar placeholders: marca final (buscar "Lex & Asociados"), fotos reales, bios, datos de contacto, cifras |
| 10.2 | Rotación de correo | Cliente genera App Password en SU Gmail → cambiar `SMTP_USER`, `SMTP_APP_PASSWORD` y `CONTACT_TO` en Vercel → redeploy → prueba final. **Solo env vars, cero código** |
| 10.3 | Seguridad post-entrega | Desarrollador **revoca su App Password** en Google (estuvo activa en un proyecto entregado) |
| 10.4 | Cierre comercial | Cobrar saldo (70% — USD $105), entregar accesos (repo/Vercel/dominio) y marcar checklist del README |

---

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Gmail bloquea el envío SMTP | Verificar que la cuenta tenga 2FA + App Password vigente; probar en Fase 5.5 antes del deploy |
| Diferencias visuales tras migrar | `docs/reference/index.html` es la fuente de verdad; comparar lado a lado por sección |
| Cliente demora el dominio | El sitio queda funcional en `*.vercel.app`; el dominio se conecta después sin re-trabajo |
| Scope creep durante la demo | Todo pedido nuevo (blog, inglés, agendamiento) se responde: "fuera del alcance de esta propuesta — se cotiza aparte" |
| Serverless y rate-limit en memoria | Aceptable para este alcance; si el spam crece, cotizar upgrade (Upstash/Turnstile) aparte |

## Orden de ejecución en Claude Code

```
1. "Usa el agente architect para revisar este PLAN.md contra el estado del repo y confirmar el arranque"
2. Fases 1–4  → agente frontend
3. Fases 5     → agente backend   (tú agregas .env.local con tus credenciales)
4. Fase 6      → frontend (con el contrato de backend)
5. Fases 7–8  → frontend + backend, architect aprueba el checklist
6. Fases 9–10 → deploy, demo con el cliente y entrega
```
