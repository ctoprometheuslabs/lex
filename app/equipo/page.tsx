import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Profile from "@/components/Profile";
import TeamGrid from "@/components/TeamGrid";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Conozca al equipo de Lex & Asociados: abogados senior que responden con nombre y apellido, desde el socio fundador hasta la coordinación de clientes.",
};

const TEAM = [
  {
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
    name: "C. Herrera S.",
    role: "Socia · Litigios",
    bio: "Especialista en litigios civiles y arbitraje. Más de doce años representando a empresas y particulares en disputas de alta cuantía.",
  },
  {
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
    name: "D. Fuentes A.",
    role: "Asociado senior · Laboral",
    bio: "Asesor de empresas en cumplimiento laboral, desvinculaciones y negociación colectiva. Formación de postgrado en derecho del trabajo.",
  },
  {
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80",
    name: "V. Morales P.",
    role: "Asociada · Corporativo",
    bio: "Estructuración societaria, contratos y operaciones de inversión. Experiencia en asesoría permanente a empresas en crecimiento.",
  },
  {
    photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80",
    name: "J. Pizarro L.",
    role: "Coordinación de clientes",
    bio: "Primer punto de contacto de la firma. Coordina agendas, plazos y reportes para que usted siempre sepa en qué está su caso.",
  },
];

const CREDENTIALS = [
  {
    label: "Formación",
    value: "Licenciado en Derecho, Universidad de Chile · LL.M., [Universidad extranjera]",
  },
  { label: "Admisión", value: "Abogado habilitado, Corte Suprema de Chile" },
  { label: "Experiencia", value: "Ex asociado senior en firma de primer nivel · Asesor de directorios" },
  { label: "Idiomas", value: "Español · Inglés" },
];

export default function EquipoPage() {
  return (
    <main>
      <PageHead
        image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Sala de trabajo del equipo"
        crumb="Inicio · Equipo"
        title="Las personas detrás de cada estrategia."
      />

      <section>
        <div className="wrap">
          <Profile
            image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80"
            imageAlt="Socio fundador"
            eyebrow="Socio fundador"
            name="R. Contreras M."
            role="Abogado — Socio fundador"
            paragraphs={[
              "Con más de quince años de ejercicio en asesoría corporativa y litigios de alta complejidad, fundó la firma para ofrecer a sus clientes lo que las grandes estructuras no siempre permiten: atención directa, estrategia a la medida y honorarios transparentes.",
            ]}
            credentials={CREDENTIALS}
          />
        </div>
      </section>

      <section className="tinted">
        <div className="wrap">
          <Reveal className="section-head center">
            <p className="eyebrow">El equipo</p>
            <h2>Un equipo senior, cercano y disponible.</h2>
          </Reveal>
          <Reveal>
            <TeamGrid members={TEAM} />
          </Reveal>
        </div>
      </section>

      <Reveal>
        <CtaBand
          title="Trabaje con un equipo que responde."
          description="Agende una reunión y conozca a quienes llevarán su caso."
          button={{ label: "Agendar reunión", href: "/contacto" }}
        />
      </Reveal>
    </main>
  );
}
