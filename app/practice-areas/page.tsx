import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import PracticeIndex from "@/components/PracticeIndex";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Derecho corporativo, litigios civiles y comerciales, laboral, inmobiliario y familia: cinco áreas con un mismo estándar de excelencia.",
};

const PRACTICE_AREAS = [
  {
    numeral: "I.",
    title: "Derecho corporativo y societario",
    description:
      "Constitución de sociedades, pactos de accionistas, fusiones y adquisiciones, gobierno corporativo, financiamientos y asesoría permanente a empresas y directorios.",
    href: "/contact",
  },
  {
    numeral: "II.",
    title: "Litigios civiles y comerciales",
    description:
      "Representación estratégica en juicios civiles, disputas contractuales, responsabilidad civil, cobranzas complejas y arbitrajes nacionales e internacionales.",
    href: "/contact",
  },
  {
    numeral: "III.",
    title: "Derecho laboral",
    description:
      "Defensa de empleadores y ejecutivos: despidos y desvinculaciones, tutela de derechos, negociación colectiva, auditorías y programas de cumplimiento laboral.",
    href: "/contact",
  },
  {
    numeral: "IV.",
    title: "Derecho inmobiliario y contratos",
    description:
      "Estudios de títulos, compraventas, promesas, arriendos comerciales, desarrollo de proyectos y estructuración de operaciones inmobiliarias.",
    href: "/contact",
  },
  {
    numeral: "V.",
    title: "Familia y sucesiones",
    description:
      "Planificación patrimonial y sucesoria, testamentos, posesiones efectivas, divorcios y acuerdos, con foco en proteger su patrimonio y su familia.",
    href: "/contact",
  },
];

export default function PracticeAreasPage() {
  return (
    <main>
      <PageHead
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Sala de reuniones"
        crumb="Inicio · Practice Areas"
        title="Especialista en las materias que definen su patrimonio."
      />

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Índice de práctica</p>
            <h2>Cinco áreas, un mismo estándar de excelencia.</h2>
          </Reveal>
          <Reveal>
            <PracticeIndex areas={PRACTICE_AREAS} />
          </Reveal>
        </div>
      </section>

      <Reveal>
        <CtaBand
          title="¿No está seguro de qué área corresponde a su caso?"
          description="Descríbame su situación y yo la encamino. Si no es mi especialidad, se lo diré con honestidad."
          button={{ label: "Escríbanos hoy", href: "/contact" }}
        />
      </Reveal>
    </main>
  );
}
