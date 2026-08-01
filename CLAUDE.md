# CLAUDE.md — Sitio Web Estudio Jurídico (Lex & Asociados)

Contexto persistente del proyecto. Leer antes de cualquier tarea.

## Qué es este proyecto

Sitio web premium para una firma de servicios legales, contratado por USD $150 con
entrega en 1–2 días hábiles. Migra de un borrador estático (`index.html`, router por
hash) a **Next.js (App Router) + TypeScript**, desplegado en **Vercel** con dominio
del cliente. Formulario de contacto 100% funcional vía **SMTP de Gmail (nodemailer)**.

- "Lex & Asociados" es nombre **placeholder** hasta que el cliente defina su marca.
- Estética objetivo: *big law* — sobria, elegante, confiable. Nunca "startup" ni genérica.
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
├── layout.tsx           # Fuentes, Topbar, Footer, metadata base
├── page.tsx             # /            (Inicio)
├── firma/page.tsx       # /firma
├── areas/page.tsx       # /areas
├── equipo/page.tsx      # /equipo
├── contacto/page.tsx    # /contacto   (formulario)
└── api/contact/route.ts # POST — envío de correos (runtime nodejs OBLIGATORIO)
components/              # Topbar, Footer, Hero, ParallaxBanner, TeamGrid...
lib/mailer.ts            # Único transporte nodemailer
public/                  # Imágenes (usar next/image)
```

Referencia visual canónica: el borrador `index.html` en la raíz. La migración es 1:1.

## Sistema de diseño (resumen — detalle completo en el agente frontend)

- Colores SOLO vía variables: `--rosewood #3F2229`, `--rosewood-deep #2C171D`,
  `--brass #A9854B`, `--brass-soft #C3A671`, `--ivory #F5F2EB`, `--paper #FBFAF6`,
  `--ink #211C1A`, `--stone #7C746C`.
- Tipografía: Libre Caslon Text (títulos, peso 400) + Libre Franklin (cuerpo/UI).
- Firma visual: marcos de doble filete, monograma circular, numerales romanos,
  `border-radius: 0` siempre, sombras casi nulas, parallax sutil con
  `prefers-reduced-motion` respetado.

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

- [ ] Reemplazar "Lex & Asociados" por la marca final del cliente
- [ ] Fotos reales del equipo (hoy: placeholders Unsplash)
- [ ] Nombres, bios, datos de contacto y cifras reales
- [ ] `CONTACT_TO` y cuenta SMTP rotadas al Gmail del cliente
- [ ] Metadata/OG con marca final + favicon con monograma
- [ ] `npm run build` limpio y formulario probado en producción
