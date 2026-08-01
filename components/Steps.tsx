import Reveal from "./Reveal";
import styles from "./Steps.module.css";

const STEPS = [
  {
    n: "01",
    title: "Consulta confidencial",
    description:
      "Me cuenta su situación. Toda la información queda protegida por secreto profesional desde el primer contacto.",
  },
  {
    n: "02",
    title: "Diagnóstico honesto",
    description:
      "Evalúo su caso con rigor y le digo con franqueza qué puede esperar, incluyendo riesgos y alternativas.",
  },
  {
    n: "03",
    title: "Estrategia y ejecución",
    description:
      "Diseño la estrategia, acordamos honorarios transparentes y ejecuto manteniéndolo informado en cada etapa.",
  },
  {
    n: "04",
    title: "Resolución",
    description:
      "Cierro el asunto buscando el mejor resultado posible y le explico en lenguaje claro qué significa para usted.",
  },
] as const;

/**
 * Sección "Cómo trabajo" (`.steps` en el mockup): 4 pasos con separadores
 * verticales hairline, responsive a 2 columnas y luego 1.
 */
export default function Steps() {
  return (
    <section id="proceso">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="label">Cómo trabajo</p>
            <h2>Un proceso claro, sin sorpresas.</h2>
          </div>
        </Reveal>
        <Reveal className={styles.steps}>
          {STEPS.map((step) => (
            <div key={step.n} className={styles.step}>
              <span className={styles.n}>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
