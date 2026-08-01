import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import StatsBar from "@/components/StatsBar";
import Quotes from "@/components/Quotes";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Quince años de ejercicio, más de doscientos asuntos resueltos y clientes que respaldan mi trabajo con resultados concretos.",
};

const STATS = [
  { value: "15+", label: "Años de ejercicio" },
  { value: "200+", label: "Asuntos resueltos" },
  { value: "5", label: "Áreas de práctica" },
  { value: "100%", label: "Confidencialidad" },
];

const MATTERS = [
  {
    numeral: "I.",
    title: "Operación de M&A — sector servicios",
    description:
      "Estructuré y negocié la venta de una empresa familiar de servicios, coordinando la due diligence, el contrato de compraventa y las garantías post-cierre.",
  },
  {
    numeral: "II.",
    title: "Litigio civil — disputa contractual",
    description:
      "Representé a una empresa en un litigio por incumplimiento contractual de alta cuantía y obtuve una resolución favorable en menos de un año.",
  },
  {
    numeral: "III.",
    title: "Estructuración inmobiliaria — proyecto comercial",
    description:
      "Asesoré la estructuración legal de un proyecto inmobiliario comercial, desde el estudio de títulos hasta los contratos de arriendo.",
  },
  {
    numeral: "IV.",
    title: "Reorganización laboral — empresa mediana",
    description:
      "Diseñé el proceso de desvinculaciones y el programa de cumplimiento laboral para la reorganización de una empresa mediana.",
  },
];

const QUOTES = [
  {
    quote:
      "Me acompañó en la venta de mi empresa familiar de principio a fin. Siempre disponible, siempre claro, y con un dominio técnico que me dio total tranquilidad.",
    author: "Cliente corporativo",
    context: "Operación de M&A — sector servicios",
  },
  {
    quote:
      "Después de dos años de conflicto, resolvió mi juicio en meses con una estrategia que ningún otro abogado me había propuesto. Directo, riguroso y honesto con las expectativas.",
    author: "Cliente particular",
    context: "Litigio civil — disputa contractual",
  },
];

export default function ExperiencePage() {
  return (
    <main>
      <PageHead
        image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Sala de trabajo"
        crumb="Inicio · Experience"
        title="Resultados que hablan por sí mismos."
      />

      <StatsBar stats={STATS} />

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Asuntos representativos</p>
            <h2>Casos reales, con total reserva de identidades.</h2>
          </Reveal>
          <Reveal>
            <div className={styles.matters}>
              {MATTERS.map((matter) => (
                <div key={matter.numeral} className={styles.matterRow}>
                  <span className={styles.matterNum}>{matter.numeral}</span>
                  <div className={styles.matterBody}>
                    <h3>{matter.title}</h3>
                    <p>{matter.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="tinted">
        <div className="wrap center">
          <Reveal className="section-head">
            <p className="eyebrow">Lo que dicen mis clientes</p>
            <h2>La confianza se construye con resultados.</h2>
          </Reveal>
          <div style={{ textAlign: "left" }}>
            <Reveal>
              <Quotes quotes={QUOTES} />
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal>
        <CtaBand
          eyebrow="Primer paso"
          title="Su situación legal merece una respuesta seria. Empecemos hoy."
          description="Agende una consulta confidencial y reciba una evaluación honesta de sus opciones."
          button={{ label: "Agendar consulta confidencial", href: "/contact" }}
        />
      </Reveal>
    </main>
  );
}
