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
        images={[
          {
            src: "https://images.unsplash.com/photo-1584200375886-3f24533fa875?auto=format&fit=crop&w=1800&q=80",
            alt: "Capitolio de Estados Unidos iluminado de noche",
          },
          {
            src: "https://images.unsplash.com/photo-1703641852658-7f066b2f5e2b?auto=format&fit=crop&w=1800&q=80",
            alt: "Washington Monument de noche",
          },
          {
            src: "https://images.unsplash.com/photo-1565970695389-c1d00f478e17?auto=format&fit=crop&w=1800&q=80",
            alt: "Lincoln Memorial de noche, Washington D.C.",
          },
          {
            src: "https://images.unsplash.com/photo-1569285647999-67fc5a1ff1ad?auto=format&fit=crop&w=1800&q=80",
            alt: "Casa Blanca iluminada de noche",
          },
        ]}
        kicker="Grant Law · Abogado"
        title={
          <>
            Estrategia legal. Resultados <em>de negocio</em>.
          </>
        }
        lead="Atiendo personalmente a empresas y personas en asuntos donde la estrategia jurídica define el resultado. Excelencia técnica, trato directo y confidencialidad absoluta."
        ctas={[
          { label: "Agendar una consulta", href: "/contact", variant: "gold" },
          { label: "Áreas de práctica", href: "/practice-areas", variant: "light" },
        ]}
        tags={["Empresas", "Inmuebles", "Inversión"]}
        caption="Guía. Estrategia. Resultados."
        introPhoto={photo}
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
