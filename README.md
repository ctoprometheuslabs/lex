# Sitio Web — Grant Law (Abogado)

Sitio web profesional para **Grant Law**, abogado individual, con diseño premium
inspirado en el estándar visual *big law*: tipografía serif clásica, paleta
institucional azul marino/dorado, y una apertura cinemática (splash + intro trailer +
transiciones entre páginas) pensada para causar una primera impresión memorable.

> **Estado:** en desarrollo activo sobre Next.js. El formulario de contacto todavía
> no tiene backend (ver Roadmap inmediato).

## Vista general

| | |
|---|---|
| **Cliente** | Grant Law — abogado individual |
| **Tipo** | Sitio corporativo multi-página, orientado a captación de clientes |
| **Stack** | Next.js (App Router) + TypeScript + CSS Modules |
| **Hosting** | Vercel, deploy por rama (`git push` → preview automático) |
| **Correo** | SMTP de Gmail vía `nodemailer` (pendiente de implementar) |

## Estructura del proyecto

```
app/
├── layout.tsx                 # Fuentes, SplashScreen, PageTransition, Topbar, Footer
├── page.tsx                   # /                (Home)
├── about/page.tsx             # /about
├── practice-areas/page.tsx    # /practice-areas
├── experience/page.tsx        # /experience
├── contact/page.tsx           # /contact
├── globals.css                # Tokens de color y utilidades base
└── api/contact/route.ts       # (pendiente) POST — envío de correos

components/                    # Topbar, Footer, Hero, ParallaxBanner, AccessCards,
                                # PracticeIndex, Values, StatsBar, Quotes, ContactForm...
components/SplashScreen.tsx    # Pantalla de carga de la primera visita
components/IntroTrailer.tsx    # Secuencia cinemática dentro del Hero de Home
components/PageTransition.tsx  # Cortina de transición entre páginas (toda navegación interna)
components/Monogram.tsx        # Monograma circular "G|L" reutilizado por los overlays
components/scrollLock.ts       # Bloqueo de scroll compartido por los tres overlays

lib/mailer.ts                  # (pendiente) transporte nodemailer
public/                        # Imágenes (photo.jpeg real + placeholders Unsplash)
```

### Páginas

1. **Home** — Hero full-bleed con `IntroTrailer` (retrato + skyline nocturno,
   textos superpuestos, "Skip intro"), tarjetas de acceso a las demás páginas.
2. **About** — Perfil en primera persona (es un abogado individual, no un equipo),
   principios, credenciales.
3. **Practice Areas** — Índice estilo expediente legal (numerales romanos I–V).
4. **Experience** — Cifras, asuntos representativos, testimonios.
5. **Contact** — Formulario de consulta (visual únicamente por ahora) + datos de contacto.

Rutas antiguas en español (`/firma`, `/areas`, `/equipo`, `/contacto`) redirigen a
las actuales vía `next.config.ts`, por si quedan enlaces sueltos.

## La experiencia de apertura y navegación

Tres piezas cinemáticas trabajan juntas, cada una con un propósito distinto:

- **Splash de primera carga** — fondo navy con el monograma centrado; solo aparece
  al cargar el sitio por primera vez (o al recargar), nunca en navegación interna.
- **Intro Trailer** — dentro del Hero de Home, solo la primera vez por sesión:
  diapositivas con crossfade (retrato profesional → skyline nocturno), textos
  superpuestos y botón "Skip intro".
- **Cortina de transición** — al navegar entre páginas (About, Practice Areas...),
  una cortina navy sube desde abajo, muestra el nombre de la página de destino y
  continúa el barrido hacia arriba para revelar la nueva página. Es una pieza
  visualmente distinta al splash (no repite el logo grande).

Los tres respetan `prefers-reduced-motion: reduce` y comparten un bloqueo de scroll
con contador (`components/scrollLock.ts`) que compensa el ancho de la scrollbar para
no generar saltos de layout.

## Sistema de diseño

**Paleta** (`app/globals.css`):

| Token | Hex | Uso |
|---|---|---|
| `--navy` | `#16294B` | Color principal, botones, bandas |
| `--navy-deep` | `#0D1B36` | Fondos oscuros, header, footer |
| `--navy-ink` | `#0A1830` | Overlays (splash/cortina), más oscuro que navy-deep |
| `--gold` | `#B9924F` | Acento dorado, eyebrows, CTA |
| `--gold-soft` | `#CBA96A` | Acento dorado sobre fondo oscuro |
| `--gold-deep` | `#8F6E37` | Hover/estados sobre acento dorado |
| `--champagne` | `#D8C08A` | Acento secundario dentro de los overlays |
| `--ivory` | `#F1EFE9` | Fondos alternos, texto sobre oscuro |
| `--paper` | `#FAF9F5` | Fondo base |
| `--ink` | `#1A1F2B` | Texto principal |
| `--stone` | `#6E7482` | Texto secundario |

**Tipografía:**
- Display/títulos: `Libre Caslon Text` (serif clásica, peso 400)
- Cuerpo/UI: `Libre Franklin`
- Eyebrows: 11px, uppercase, letter-spacing `.32em`

**Firma visual:** marcos de doble filete, monograma circular, numerales romanos en
índices, parallax sutil en Hero y banners, `border-radius: 0` siempre.

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # debe pasar sin errores antes de cualquier entrega
npm run lint
```

## Correo (formulario de contacto)

**Aún no implementado.** El contrato (variables de entorno, validación, plantillas)
está definido en `.claude/agents/backend.md` y `CLAUDE.md`. Variables previstas:

```
SMTP_USER=            # Gmail remitente (demo: cto@prometheuslabs.com.co)
SMTP_APP_PASSWORD=    # App Password de Google — nunca en el repo
CONTACT_TO=           # receptor de las consultas
```

## Deploy en Vercel

```bash
vercel          # deploy preview (por rama)
vercel --prod   # producción
```

Las variables de entorno de producción se cargan en el dashboard de Vercel
(**Settings → Environment Variables**), nunca en el repo.

## Checklist de personalización (antes de entregar)

- [ ] Implementar backend del formulario de contacto (`app/api/contact/route.ts` + `lib/mailer.ts`)
- [ ] Reemplazar fotos placeholder de Unsplash por fotografía real donde falte
- [ ] Datos de contacto reales (teléfono, correo, dirección, horario)
- [ ] Cifras reales en `/experience` (años, casos, áreas)
- [ ] `CONTACT_TO` y cuenta SMTP rotadas al Gmail del cliente
- [ ] `<title>`, meta description y Open Graph con la marca final
- [ ] Favicon con el monograma de la firma
- [ ] Testimonios reales (con autorización del cliente) o remover sección

## Roadmap (mejoras cotizables aparte)

- Blog / publicaciones legales
- Agendamiento en línea (Calendly o similar)
- Versión en inglés
- Google Analytics / Search Console
- Schema.org `LegalService` para SEO local

## Convenciones

- **TypeScript estricto**; sin `any` sin justificar.
- **Dependencias mínimas:** `nodemailer` es la única aprobada además de Next.js.
- **CSS Modules** por componente; tokens de color solo vía variables en `:root`.
- **Ediciones quirúrgicas:** leer antes de editar, no regenerar archivos completos.
- **Accesibilidad:** respetar `prefers-reduced-motion` (parallax, reveals y los tres
  overlays cinemáticos se desactivan/acortan), focus visible, `alt` en imágenes.
- **Idioma:** copy en español formal (trato de "usted"), en singular — es un abogado
  individual, no un equipo. Menú y rutas en inglés.

---

**Desarrollado por:** Prometheus Labs · cto@prometheuslabs.com.co
