# CLAUDE.md — Sitio Web Grant Law (Abogado)

Contexto persistente del proyecto. Leer antes de cualquier tarea.

## Qué es este proyecto

Sitio web para **Grant Law**, abogado individual (marca real del cliente), contratado
por USD $150 con entrega en 1–2 días hábiles. **Next.js (App Router) + TypeScript**,
desplegado en **Vercel** con dominio del cliente. Formulario de contacto 100%
funcional vía **SMTP de Gmail (nodemailer)**.

- El sitio es **one-page**: una sola landing con secciones ancladas
  (`#areas`, `#perfil`, `#proceso`, `#contacto`). Las rutas antiguas
  (`/firma`, `/areas`, `/equipo`, `/contacto`) redirigen a sus anclas.
- Historia: la v1 ("Lex & Asociados", estética *big law* rosewood/brass) fue
  **rechazada por el cliente** ("sigue pareciendo IA"). La v2 vigente sigue las
  referencias de estilo del cliente (odesa.com.ar, roster-store.vercel.app):
  editorial, claro, tipografía grande, un solo acento de color.
- Es UNA persona, no una firma: el copy va en primera persona singular
  ("Atiendo personalmente cada caso"). No existe sección "Equipo"; existe "Perfil".
- Idioma del sitio: español formal (trato de "usted").

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
├── layout.tsx           # Fuente Archivo, Topbar, Footer, metadata base
├── page.tsx             # /  (one-page: Hero, Declaración, Áreas, Perfil,
│                        #     Proceso, Testimonio, Contacto)
└── api/contact/route.ts # POST — envío de correos (runtime nodejs OBLIGATORIO)
components/              # Topbar, Footer, secciones de la landing, ContactForm
lib/mailer.ts            # Único transporte nodemailer
next.config.ts           # redirects: /firma→/#perfil, /areas→/#areas,
                         #            /equipo→/#perfil, /contacto→/#contacto
public/                  # Imágenes (usar next/image)
```

Referencia visual canónica: `docs/reference/grant-law.html` (mockup aprobado por el
cliente). La migración es 1:1. El borrador v1 rechazado queda archivado en
`docs/reference/lex-asociados-v1.html` — NO usarlo como referencia de estilo.

## Sistema de diseño (resumen)

- Colores SOLO vía variables: `--paper #FAFAF7` (fondo), `--ink #1B1A17` (texto),
  `--oxide #8A2E2B` (único acento), `--oxide-deep #6E2321`, `--muted #6F6B63`,
  `--line #E6E3DC` (hairlines), `--line-dark rgba(27,26,23,.14)`.
- Tipografía: **Archivo** (única familia; 400/500/600/700/900). Display en 900
  con tracking negativo; labels en uppercase con tracking amplio.
- Firma visual: retícula editorial con hairlines, numeración 01–05, botones pill
  (`border-radius: 999px`), campos de formulario planos con solo borde inferior,
  fotografía desaturada (`saturate(.7)`), reveals sutiles con
  `prefers-reduced-motion` respetado. Sin parallax, sin marcos decorativos,
  sin monogramas ni numerales romanos.

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

Incluido: sitio one-page (rediseño Grant Law aceptado en lugar de las 5 páginas
originales) + formulario funcional + deploy en Vercel + dominio configurado
+ SEO base + una ronda de ajustes menores (ya consumida por el rediseño v2).
Fuera de alcance (cotizar aparte, avisar al usuario): blog, i18n/inglés, agendamiento
en línea, analytics, CMS, páginas adicionales.

## Pendientes antes de entregar

- [ ] Foto real del abogado (hoy: placeholder Unsplash) y datos biográficos reales
- [ ] Datos de contacto reales (teléfono, correo, oficina)
- [ ] `CONTACT_TO` y cuenta SMTP rotadas al Gmail del cliente
- [ ] Metadata/OG con marca Grant Law + favicon
- [ ] `npm run build` limpio y formulario probado en producción
