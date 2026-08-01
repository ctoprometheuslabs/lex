import Hero from "@/components/Hero";
import AccessCards from "@/components/AccessCards";
import Reveal from "@/components/Reveal";
import photo from "@/public/photo.jpeg";

const ACCESS_CARDS = [
  {
    numeral: "I.",
    title: "Perfil",
    description: "Quince años de ejercicio en asesoría corporativa y litigios de alta complejidad.",
    href: "/about",
  },
  {
    numeral: "II.",
    title: "Áreas de práctica",
    description: "Derecho corporativo, litigios, laboral, inmobiliario y familia, con un mismo estándar.",
    href: "/practice-areas",
  },
  {
    numeral: "III.",
    title: "Trayectoria",
    description: "Asuntos representativos y cifras que respaldan cada estrategia que propongo.",
    href: "/experience",
  },
  {
    numeral: "IV.",
    title: "Contacto",
    description: "Agende una consulta confidencial. Le respondo personalmente dentro de un día hábil.",
    href: "/contact",
  },
];

export default function Home() {
  return (
    <main>
      <Hero
        image="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Interior de oficina jurídica"
        speed={0.25}
        kicker="Grant Law · Abogado"
        title={
          <>
            Asesoría legal con criterio, rigor y <em>resultados</em>.
          </>
        }
        lead="Atiendo personalmente a empresas y personas en asuntos donde la estrategia jurídica define el resultado. Excelencia técnica, trato directo y confidencialidad absoluta."
        ctas={[
          { label: "Agendar una consulta", href: "/contact", variant: "gold" },
          { label: "Áreas de práctica", href: "/practice-areas", variant: "light" },
        ]}
        portrait={{ src: photo, alt: "Grant, retrato profesional" }}
      />

      <section>
        <div className="wrap">
          <Reveal className="section-head center">
            <p className="eyebrow">Conozca la práctica</p>
            <h2>Todo lo que necesita saber, a un clic.</h2>
          </Reveal>
          <Reveal>
            <AccessCards cards={ACCESS_CARDS} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
