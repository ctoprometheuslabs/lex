import styles from "./Monogram.module.css";

/**
 * Monograma circular "G|L" usado por la pantalla de carga inicial y la
 * cortina de navegación. El tamaño se controla desde el contenedor con la
 * custom property `--mg-size` (heredada), por defecto 104px.
 */
export default function Monogram({ className }: { className?: string }) {
  return (
    <span className={className ? `${styles.monogram} ${className}` : styles.monogram} aria-hidden="true">
      <span className={styles.g}>G</span>
      <span className={styles.bar} />
      <span className={styles.l}>L</span>
    </span>
  );
}
