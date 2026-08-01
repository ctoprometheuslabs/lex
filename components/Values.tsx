import styles from "./Values.module.css";

type Value = {
  numeral: string;
  title: string;
  description: string;
};

type ValuesProps = {
  values: Value[];
};

/**
 * Grid de "principios" de la firma (`.values`/`.value` en el borrador,
 * sección tinted de `/firma`). Tarjetas rosewood con numeral romano.
 */
export default function Values({ values }: ValuesProps) {
  return (
    <div className={styles.values}>
      {values.map((value) => (
        <div key={value.numeral} className={styles.value}>
          <span className={styles.indexNum}>{value.numeral}</span>
          <h3>{value.title}</h3>
          <p>{value.description}</p>
        </div>
      ))}
    </div>
  );
}
