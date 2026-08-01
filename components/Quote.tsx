import Reveal from "./Reveal";
import styles from "./Quote.module.css";

/**
 * Testimonio único centrado (`.quote` en el mockup) con comilla oxide
 * gigante.
 */
export default function Quote() {
  return (
    <div className={styles.quote}>
      <section>
        <div className="wrap">
          <Reveal className={styles.quoteInner}>
            <span className={styles.quoteMark}>&ldquo;</span>
            <p>
              Después de dos años de conflicto, resolvió nuestro juicio en meses con una
              estrategia que ningún otro abogado nos había propuesto. Directo, riguroso y
              honesto con las expectativas.
            </p>
            <footer>Cliente particular — Litigio civil</footer>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
