import Hero from "@/components/Hero";

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
    </main>
  );
}
