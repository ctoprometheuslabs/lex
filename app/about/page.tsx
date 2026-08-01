import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import ParallaxBanner from "@/components/ParallaxBanner";
import Values from "@/components/Values";
import Reveal from "@/components/Reveal";
import photo from "@/public/photo.jpeg";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Conozca a Grant Law: un abogado con estándar de gran firma, atención directa y confidencialidad absoluta.",
};

const VALUES = [
  {
    numeral: "I.",
    title: "Honestidad estratégica",
    description:
      "Evalúo su caso con rigor y le digo con franqueza qué puede esperar. No vendo ilusiones: construyo estrategias viables.",
  },
  {
    numeral: "II.",
    title: "Atención personal",
    description:
      "Su caso lo llevo yo, de principio a fin, con comunicación directa y reportes periódicos en lenguaje claro.",
  },
  {
    numeral: "III.",
    title: "Confidencialidad absoluta",
    description:
      "La reserva es la base de mi profesión. Su información se protege con el más alto estándar, siempre.",
  },
];

const CREDENTIALS = [
  {
    label: "Formación",
    value: "Licenciado en Derecho, Universidad de Chile · LL.M., [Universidad extranjera]",
  },
  { label: "Admisión", value: "Abogado habilitado, Corte Suprema de Chile" },
  {
    label: "Experiencia",
    value: "Quince años de ejercicio en asesoría corporativa y litigios de alta complejidad",
  },
  { label: "Idiomas", value: "Español · Inglés" },
];

export default function AboutPage() {
  return (
    <main>
      <PageHead
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Pasillo de oficinas"
        crumb="Inicio · About"
        title="Un abogado, un estándar de gran firma."
      />

      <section>
        <div className="wrap">
          <div className={styles.split}>
            <Reveal className={styles.img}>
              <Image
                src={photo}
                alt="Grant, retrato profesional"
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </Reveal>
            <Reveal className={styles.copy}>
              <p className="eyebrow">Quién soy</p>
              <h2 style={{ fontSize: "clamp(26px,3vw,36px)", margin: "16px 0 24px" }}>
                Nací de una convicción simple.
              </h2>
              <p>
                Los asuntos legales importantes merecen la atención directa de un abogado
                senior — no la de un intermediario. Por eso, en Grant Law cada cliente
                trabaja directamente conmigo, sin escalones intermedios.
              </p>
              <p>
                Combino el estándar técnico de las grandes firmas con la cercanía,
                agilidad y transparencia de una práctica boutique. Mis clientes van desde
                empresas en crecimiento y familias empresarias hasta ejecutivos y personas
                que enfrentan una disputa decisiva.
              </p>
              <p>
                Ejerzo con una regla de oro: decirle al cliente la verdad sobre su caso,
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
            <h2>Tres compromisos que no negocio.</h2>
          </Reveal>
          <Reveal>
            <Values values={VALUES} />
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Credenciales</p>
            <h2>Formación y trayectoria que respaldan cada estrategia.</h2>
          </Reveal>
          <Reveal>
            <ul className={styles.creds}>
              {CREDENTIALS.map((credential) => (
                <li key={credential.label}>
                  <b>{credential.label}</b>
                  <span>{credential.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ParallaxBanner
        image="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Interior de oficina jurídica"
        speed={0.2}
      >
        <Reveal>
          <h2>¿Quiere saber si puedo ayudarle?</h2>
          <p>La primera conversación es confidencial y sin compromiso.</p>
          <Link href="/contact" className="btn btn-brass">
            Agendar consulta
          </Link>
        </Reveal>
      </ParallaxBanner>
    </main>
  );
}
