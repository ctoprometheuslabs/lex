import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import ParallaxBanner from "@/components/ParallaxBanner";
import Values from "@/components/Values";
import Reveal from "@/components/Reveal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "La firma",
  description:
    "Conozca a Lex & Asociados: una firma boutique con estándar de gran estudio, atención directa de socios y confidencialidad absoluta.",
};

const VALUES = [
  {
    numeral: "I.",
    title: "Honestidad estratégica",
    description:
      "Evaluamos su caso con rigor y le decimos con franqueza qué puede esperar. No vendemos ilusiones: construimos estrategias viables.",
  },
  {
    numeral: "II.",
    title: "Atención de socio",
    description:
      "Su caso lo lleva un abogado senior de principio a fin, con comunicación directa y reportes periódicos en lenguaje claro.",
  },
  {
    numeral: "III.",
    title: "Confidencialidad absoluta",
    description:
      "La reserva es la base de nuestra profesión. Su información se protege con el más alto estándar, siempre.",
  },
];

export default function FirmaPage() {
  return (
    <main>
      <PageHead
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Pasillo de oficinas de la firma"
        crumb="Inicio · La firma"
        title="Una firma boutique con estándar de gran estudio."
      />

      <section>
        <div className="wrap">
          <div className={styles.split}>
            <Reveal className={styles.img}>
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
                alt="Reunión con clientes"
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </Reveal>
            <Reveal className={styles.copy}>
              <p className="eyebrow">Quiénes somos</p>
              <h2 style={{ fontSize: "clamp(26px,3vw,36px)", margin: "16px 0 24px" }}>
                Nacimos de una convicción simple.
              </h2>
              <p>
                Los asuntos legales importantes merecen la atención directa de un abogado
                senior — no la de un intermediario. Por eso, en Lex &amp; Asociados cada
                cliente trabaja directamente con un socio de la firma.
              </p>
              <p>
                Combinamos el estándar técnico de las grandes firmas con la cercanía,
                agilidad y transparencia de un estudio boutique. Nuestros clientes van desde
                empresas en crecimiento y familias empresarias hasta ejecutivos y personas
                que enfrentan una disputa decisiva.
              </p>
              <p>
                Ejercemos con una regla de oro: decirle al cliente la verdad sobre su caso,
                aunque no sea lo que quiere escuchar.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="tinted">
        <div className="wrap center">
          <Reveal className="section-head">
            <p className="eyebrow">Principios</p>
            <h2>Tres compromisos que no negociamos.</h2>
          </Reveal>
          <Reveal>
            <Values values={VALUES} />
          </Reveal>
        </div>
      </section>

      <ParallaxBanner
        image="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Interior de oficina jurídica"
        speed={0.2}
      >
        <Reveal>
          <h2>¿Quiere saber si podemos ayudarle?</h2>
          <p>La primera conversación es confidencial y sin compromiso.</p>
          <Link href="/contacto" className="btn btn-brass">
            Agendar consulta
          </Link>
        </Reveal>
      </ParallaxBanner>
    </main>
  );
}
