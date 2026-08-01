# Sitio Web — Estudio Jurídico (Lex & Asociados)

Sitio web profesional para firma de servicios legales, con diseño premium inspirado en el estándar visual de las firmas *big law*: tipografía serif clásica, paleta institucional y experiencia de navegación cuidada.

> **Estado:** Borrador funcional aprobado por el cliente · Nombre "Lex & Asociados" es placeholder hasta definir la marca final.

## Vista general

| | |
|---|---|
| **Cliente** | Firma de servicios legales (nombre por definir) |
| **Tipo** | Sitio corporativo multi-página, orientado a captación de clientes |
| **Stack** | HTML5 + CSS3 + JavaScript vanilla (sin frameworks ni build step) |
| **Hosting** | Vercel (deploy estático) con dominio personalizado del cliente |
| **Plazo** | 1–2 días hábiles desde anticipo |

## Estructura del proyecto

```
.
├── index.html              # Sitio completo (router por hash: 5 páginas)
├── README.md
└── .claude/
    └── agents/
        └── frontend.md     # Agente frontend para Claude Code
```

El borrador actual vive en **un solo archivo** (`index.html`) con un router por hash (`#/inicio`, `#/firma`, `#/areas`, `#/equipo`, `#/contacto`). Para producción se puede mantener así o separar en páginas HTML independientes (mejor SEO — ver Roadmap).

### Páginas

1. **Inicio** — Hero con parallax, cifras, tarjetas de áreas, banner de promesa, preview del equipo, testimonios, CTA final.
2. **La Firma** — Historia, principios (3 valores), banner CTA.
3. **Áreas de Práctica** — Índice estilo expediente legal (numerales romanos I–V).
4. **Equipo** — Perfil destacado del socio fundador + grilla de 4 integrantes.
5. **Contacto** — Formulario de consulta + datos de la firma.

## Sistema de diseño

**Paleta** (derivada del concepto "rosewood" / palo de rosa):

| Token | Hex | Uso |
|---|---|---|
| `--rosewood` | `#3F2229` | Color principal, botones, bandas |
| `--rosewood-deep` | `#2C171D` | Fondos oscuros, header, footer |
| `--brass` | `#A9854B` | Acento dorado, eyebrows, CTA |
| `--brass-soft` | `#C3A671` | Acento dorado sobre fondo oscuro |
| `--ivory` | `#F5F2EB` | Fondos alternos, texto sobre oscuro |
| `--paper` | `#FBFAF6` | Fondo base |
| `--ink` | `#211C1A` | Texto principal |
| `--stone` | `#7C746C` | Texto secundario |

**Tipografía:**
- Display/títulos: `Libre Caslon Text` (serif clásica de documentos legales)
- Cuerpo/UI: `Libre Franklin`
- Eyebrows: Franklin 11px, uppercase, letter-spacing `.32em`

**Firma visual:** marcos de doble filete estilo membrete grabado, monograma circular, numerales romanos en índices, parallax sutil en hero y banners.

## Desarrollo local

No requiere instalación. Opciones:

```bash
# Abrir directamente
open index.html

# O servir localmente (recomendado para probar rutas)
npx serve .
# → http://localhost:3000
```

## Deploy en Vercel

```bash
npm i -g vercel
vercel          # primer deploy (preview)
vercel --prod   # producción
```

Luego, en el dashboard de Vercel: **Settings → Domains** → agregar el dominio del cliente y configurar los DNS según las instrucciones (registro `A` / `CNAME`). El certificado HTTPS se emite automáticamente.

## Checklist de personalización (antes de entregar)

- [ ] Reemplazar nombre "Lex & Asociados" por la marca final (buscar y reemplazar en `index.html`)
- [ ] Reemplazar fotos placeholder de Unsplash por fotos reales del equipo
- [ ] Nombres, cargos y bios reales del equipo
- [ ] Datos de contacto reales (teléfono, correo, dirección, horario)
- [ ] Cifras reales del hero (años, casos, abogados)
- [ ] Conectar formulario de contacto (Formspree, Resend o API route de Vercel)
- [ ] Ajustar áreas de práctica según especialidad real del abogado
- [ ] `<title>`, meta description y Open Graph con la marca final
- [ ] Favicon con el monograma de la firma
- [ ] Testimonios reales (con autorización del cliente) o remover sección

## Roadmap (mejoras cotizables aparte)

- Separar en páginas HTML independientes o migrar a Astro/Next.js (SEO por página)
- Blog / publicaciones legales
- Agendamiento en línea (Calendly o similar)
- Versión en inglés
- Google Analytics / Search Console
- Schema.org `LegalService` para SEO local

## Convenciones

- **Sin dependencias:** todo en vanilla; fuentes vía Google Fonts.
- **CSS:** variables en `:root`, mobile-first en media queries (breakpoints 1020/960/820px).
- **Accesibilidad:** respetar `prefers-reduced-motion` (parallax y reveals se desactivan), focus visible, `alt` en imágenes.
- **Idioma:** copy en español formal (trato de "usted"), tono sobrio — nunca coloquial ni "startup".

---

**Desarrollado por:** Andrés Felipe Arboleda · Prometheus Labs · cto@prometheuslabs.com.co
