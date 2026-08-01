import styles from "./AreaIndex.module.css";

type Area = {
  num: string;
  title: string;
  description: string;
};

type AreaIndexProps = {
  areas: readonly Area[];
};

/**
 * Índice numerado de áreas de práctica (`.area-row` en el mockup): filas
 * con hairlines, hover a blanco y flecha "Consultar →" que aparece.
 */
export default function AreaIndex({ areas }: AreaIndexProps) {
  return (
    <div className={styles.areas}>
      {areas.map((area) => (
        <a key={area.num} className={styles.areaRow} href="#contacto">
          <span className={styles.areaNum}>{area.num}</span>
          <h3>{area.title}</h3>
          <p>{area.description}</p>
          <span className={styles.areaGo}>Consultar →</span>
        </a>
      ))}
    </div>
  );
}
