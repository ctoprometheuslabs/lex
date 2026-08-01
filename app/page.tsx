import Link from "next/link";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import AreaCards from "@/components/AreaCards";
import ParallaxBanner from "@/components/ParallaxBanner";
import TeamGrid from "@/components/TeamGrid";
import Quotes from "@/components/Quotes";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";

const STATS = [
  { value: "15+", label: "Años de trayectoria" },
  { value: "200+", label: "Asuntos resueltos" },
  { value: "4", label: "Abogados senior" },
  { value: "100%", label: "Confidencialidad" },
];

const AREA_CARDS = [
  {
    numeral: "I.",
    title: "Derecho corporativo",
    description: "Sociedades, M&A, pactos de accionistas y asesoría permanente a empresas.",
    href: "/areas",
  },
  {
    numeral: "II.",
    title: "Litigios civiles y comerciales",
    description: "Juicios, disputas contractuales, cobranzas complejas y arbitrajes.",
    href: "/areas",
  },
  {
    numeral: "III.",
    title: "Derecho laboral",
    description: "Defensa de empleadores y ejecutivos, cumplimiento y negociación.",
    href: "/areas",
  },
  {
    numeral: "IV.",
    title: "Inmobiliario y contratos",
    description: "Estudios de títulos, compraventas y estructuración de operaciones.",
    href: "/areas",
  },
  {
    numeral: "V.",
    title: "Familia y sucesiones",
    description: "Planificación patrimonial, testamentos y protección de la familia.",
    href: "/areas",
  },
  {
    numeral: "VI.",
    title: "¿Otra materia?",
    description: "Cuéntenos su caso. Si no es nuestra especialidad, lo derivamos con honestidad.",
    href: "/contacto",
  },
];

const TEAM_PREVIEW = [
  {
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80",
    name: "R. Contreras M.",
    role: "Socio fundador",
  },
  {
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
    name: "C. Herrera S.",
    role: "Socia · Litigios",
  },
  {
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
    name: "D. Fuentes A.",
    role: "Asociado senior",
  },
  {
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80",
    name: "V. Morales P.",
    role: "Asociada · Corporativo",
  },
];

const QUOTES = [
  {
    quote:
      "Nos acompañaron en la venta de nuestra empresa familiar de principio a fin. Siempre disponibles, siempre claros, y con un dominio técnico que nos dio total tranquilidad.",
    author: "Cliente corporativo",
    context: "Operación de M&A — sector servicios",
  },
  {
    quote:
      "Después de dos años de conflicto, resolvieron nuestro juicio en meses con una estrategia que ningún otro estudio nos había propuesto. Directos, rigurosos y honestos con las expectativas.",
    author: "Cliente particular",
    context: "Litigio civil — disputa contractual",
  },
];

export default function Home() {
  return (
    <main>
      <Hero
        image="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Interior de oficina jurídica"
        speed={0.25}
        kicker="Lex & Asociados · Estudio Jurídico"
        title={
          <>
            Asesoría legal con criterio, rigor y <em>resultados</em>.
          </>
        }
        lead="Representamos a empresas y personas en asuntos donde la estrategia jurídica define el resultado. Excelencia técnica, trato directo y confidencialidad absoluta."
        ctas={[
          { label: "Agendar una consulta", href: "/contacto", variant: "brass" },
          { label: "Áreas de práctica", href: "/areas", variant: "light" },
        ]}
      />

      <StatsBar stats={STATS} />

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Áreas de práctica</p>
            <h2>Un servicio jurídico integral, con la profundidad de un especialista.</h2>
          </Reveal>
          <Reveal>
            <AreaCards cards={AREA_CARDS} />
          </Reveal>
        </div>
      </section>

      <ParallaxBanner
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Sala de reuniones de la firma"
        speed={0.2}
      >
        <Reveal>
          <p className="eyebrow center" style={{ justifyContent: "center", color: "var(--brass-soft)" }}>
            Nuestra promesa
          </p>
          <h2 style={{ marginTop: 18 }}>
            Cada caso recibe la atención directa de un <em>abogado senior</em>.
          </h2>
          <p>
            Sin intermediarios. Comunicación clara, honorarios transparentes y una estrategia
            diseñada para su caso — no una plantilla.
          </p>
          <Link href="/firma" className="btn btn-light">
            Conozca la firma
          </Link>
        </Reveal>
      </ParallaxBanner>

      <section className="tinted">
        <div className="wrap center">
          <Reveal className="section-head">
            <p className="eyebrow">Nuestro equipo</p>
            <h2>Abogados que responden con nombre y apellido.</h2>
          </Reveal>
          <div style={{ textAlign: "left" }}>
            <Reveal>
              <TeamGrid members={TEAM_PREVIEW} href="/equipo" />
            </Reveal>
          </div>
          <div style={{ marginTop: 54 }}>
            <Reveal>
              <Link href="/equipo" className="btn btn-solid">
                Conocer al equipo
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap center">
          <Reveal className="section-head">
            <p className="eyebrow">Lo que dicen los clientes</p>
            <h2>La confianza se construye con resultados.</h2>
          </Reveal>
          <Reveal>
            <Quotes quotes={QUOTES} />
          </Reveal>
        </div>
      </section>

      <Reveal>
        <CtaBand
          eyebrow="Primer paso"
          title="Su situación legal merece una respuesta seria. Empecemos hoy."
          description="Agende una consulta confidencial y reciba una evaluación honesta de sus opciones."
          button={{ label: "Agendar consulta confidencial", href: "/contacto" }}
        />
      </Reveal>
    </main>
  );
}
