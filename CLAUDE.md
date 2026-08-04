# CLAUDE.md — Sitio Web Grant Law (Abogado)

Contexto persistente del proyecto. Leer antes de cualquier tarea.

## Qué es este proyecto

Sitio web premium para **Grant Law**, abogado individual (no una firma con equipo),
contratado por USD $150. Ya migrado de un borrador estático a **Next.js (App Router)
+ TypeScript**, desplegado en **Vercel**. Formulario de contacto pensado para SMTP de
Gmail (nodemailer) — **aún sin implementar**, ver "Pendientes".

- "Grant Law" es la marca **definitiva** (el cliente rechazó "Lex & Asociados" por
  parecer genérico/IA; ver `docs/` e historial de commits del pivote).
- Estética objetivo: *big law* — sobria, elegante, confiable. Nunca "startup" ni genérica.
- Estructura multipágina: Home / About / Practice Areas / Experience / Contact.
  Menú y rutas en inglés (`/about`, `/practice-areas`, `/experience`, `/contact`);
  contenido en español formal (trato de "usted"), en singular ("yo", no "nosotros" —
  es un abogado, no un equipo).
- El sitio abre con una experiencia cinemática (splash + intro trailer + cortina de
  navegación entre páginas) — ver "Transiciones y overlays" más abajo. Es un
  diferencial del proyecto; no simplificar ni quitar sin pedirlo explícitamente.

## Agentes del proyecto (`.claude/agents/`)

| Agente | Cuándo usarlo |
|---|---|
| `architect` | PRIMERO en tareas grandes/ambiguas. Planifica, define estructura, reparte trabajo. No implementa. |
| `frontend` | Todo lo visual: páginas, componentes, estilos, parallax, responsive, accesibilidad, copy. |
| `backend` | API routes, correos SMTP, validación, variables de entorno, plantillas de email. |

Regla: frontend no toca lógica de servidor; backend no toca estilos. Si una tarea cruza
la frontera, `architect` define el contrato entre ambos.

## Arquitectura

```
app/
├── layout.tsx                 # Fuentes, SplashScreen, PageTransition, Topbar, Footer, metadata
├── page.tsx                   # /                (Home — Hero con IntroTrailer)
├── about/page.tsx             # /about
├── practice-areas/page.tsx    # /practice-areas
├── experience/page.tsx        # /experience
├── contact/page.tsx           # /contact         (formulario)
├── globals.css                # Tokens de color, utilidades base, botones
└── api/contact/route.ts       # POST — envío de correos (runtime nodejs OBLIGATORIO) — NO CREADO AÚN
components/
├── Topbar, Footer, Hero, PageHead, ParallaxBanner/ParallaxLayer, useParallax
├── AccessCards, PracticeIndex, Values, StatsBar, Quotes, CtaBand, ContactForm, Reveal
└── SplashScreen, PageTransition, IntroTrailer, Monogram, scrollLock.ts   # overlays cinemáticos
lib/mailer.ts                  # Transporte nodemailer — NO CREADO AÚN
public/                        # Imágenes reales (photo.jpeg) + placeholders Unsplash
next.config.ts                 # redirects: /firma→/about, /equipo→/about, /areas→/practice-areas,
                                # /contacto→/contact (rutas viejas en español, por si quedan enlaces)
```

## Sistema de diseño (resumen — detalle completo en el agente frontend)

- Colores SOLO vía variables (`app/globals.css`): `--navy #16294B`, `--navy-deep #0D1B36`,
  `--navy-ink #0A1830` (overlays, más oscuro que navy-deep), `--gold #B9924F`,
  `--gold-soft #CBA96A`, `--gold-deep #8F6E37` (hover/estados), `--champagne #D8C08A`
  (acento secundario en overlays), `--ivory #F1EFE9`, `--paper #FAF9F5`, `--ink #1A1F2B`,
  `--stone #6E7482`.
- Tipografía: Libre Caslon Text (títulos, peso 400) + Libre Franklin (cuerpo/UI).
- Firma visual: marcos de doble filete, monograma circular (componente `Monogram`),
  numerales romanos, `border-radius: 0` siempre, sombras casi nulas, parallax sutil con
  `prefers-reduced-motion` respetado.

## Transiciones y overlays

Tres piezas cinemáticas, cada una con su propio propósito — no son intercambiables:

1. **`SplashScreen`** — navy + monograma centrado. Solo en la carga completa/primera
   (vive en `layout.tsx`, que no se remonta entre navegaciones client-side). Dispara
   el evento `gl:splash-done` para que `IntroTrailer` arranque justo cuando empieza a
   desvanecerse.
2. **`IntroTrailer`** (dentro de `Hero`, solo en Home) — secuencia de diapositivas
   (retrato del cliente + skyline nocturno) con textos superpuestos y botón
   "Skip intro". Se reproduce una vez por `sessionStorage` (`gl-intro-seen`).
3. **`PageTransition`** — cortina que cubre de abajo hacia arriba en cada navegación
   interna (intercepta clics en `<a>`, no es un router propio). **Distinta a
   propósito** del splash: muestra el nombre de la página destino, no el logo.
   Vive montada permanentemente en `layout.tsx` en reposo (fuera de pantalla vía
   `transform`) — **nunca la desmontes condicionalmente**: si se desmonta en idle,
   el próximo montaje aplica el estado "cubriendo" desde la inserción y el navegador
   no tiene valor previo desde el cual animar (efecto de "salto" en vez de
   deslizamiento). Por la misma razón, el estado de reposo debe tener
   `transition: none` explícito — si hereda una transición, al volver a reposo tras
   revelar anima de vuelta a través de la pantalla visible.

Todos comparten `components/scrollLock.ts` (bloqueo de scroll con contador, porque
puede haber más de un overlay activo a la vez, y compensación del ancho de la
scrollbar para evitar saltos laterales de layout). Los tres respetan
`prefers-reduced-motion: reduce` (se desactivan o se acortan a casi cero).

## Correo / SMTP (crítico)

Variables de entorno — únicos nombres válidos:

```
SMTP_USER=cto@prometheuslabs.com.co   # remitente demo (luego: Gmail del cliente)
SMTP_APP_PASSWORD=                     # App Password de Google
CONTACT_TO=                            # receptor de consultas (demo: el desarrollador)
```

- La App Password la coloca el usuario en `.env.local` y en Vercel. **NUNCA pedirla,
  escribirla, loguearla ni commitearla.**
- `.env*` en `.gitignore` (excepto `.env.example`, que se mantiene sin valores).
- Cada consulta envía 2 correos: notificación a `CONTACT_TO` (con `replyTo` del
  consultante) + confirmación al consultante.
- Demo con el cliente: cuando pruebe el formulario debe llegar correo real — esa es
  la prueba de que funciona. Post-entrega: se rotan las 3 variables al Gmail del
  cliente. Cambio de cuenta = solo env vars, jamás código.

## Comandos

```bash
npm run dev      # desarrollo local (http://localhost:3000)
npm run build    # DEBE pasar sin errores antes de cualquier entrega
npm run lint
vercel           # deploy preview
vercel --prod    # producción (env vars se cargan en el dashboard de Vercel)
```

## Nota técnica — Next.js 16

Este scaffold usa Next.js 16 (Turbopack), una versión posterior al conocimiento de
entrenamiento de varios modelos. Antes de usar una API que no reconozcas o que
parezca obsoleta, consulta `node_modules/next/dist/docs/` o la documentación oficial
en vez de asumir el comportamiento de versiones anteriores de Next. Presta atención a
los avisos de deprecación en la consola de `next dev` / `next build`.

## Convenciones

- TypeScript estricto; sin `any` sin justificar.
- Dependencias mínimas: `nodemailer` es la única aprobada además de Next.js.
  Cualquier otra requiere aprobación explícita del usuario.
- Ediciones quirúrgicas: leer antes de editar, no regenerar archivos completos.
- Commits en español, imperativo: "Agrega página de contacto".
- Imágenes placeholder de Unsplash con `loading="lazy"` hasta tener fotos reales.

## Alcance contratado (guardarraíl)

Incluido: 5 páginas + formulario funcional + deploy en Vercel + dominio configurado
+ SEO base + una ronda de ajustes menores.
Fuera de alcance (cotizar aparte, avisar al usuario): blog, i18n/inglés, agendamiento
en línea, analytics, CMS, páginas adicionales.

## Pendientes antes de entregar

- [ ] **Backend del formulario de contacto sin implementar**: no existen
      `app/api/contact/route.ts` ni `lib/mailer.ts`. `ContactForm.tsx` es solo
      estructura visual (botón sin `onClick`, sin fetch). Ver `.claude/agents/backend.md`
      para el contrato completo antes de construirlo.
- [ ] Fotos reales adicionales (hoy: `public/photo.jpeg` real + placeholders Unsplash
      para banners/parallax)
- [ ] Datos de contacto y cifras reales (hoy: contenido de ejemplo en `experience`)
- [ ] `CONTACT_TO` y cuenta SMTP configuradas al Gmail del cliente (una vez exista el backend)
- [ ] Metadata/OG con marca final + favicon con monograma
- [ ] `npm run build` limpio y formulario probado en producción
