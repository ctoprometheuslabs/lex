import Reveal from "./Reveal";
import styles from "./Statement.module.css";

/**
 * Banda de declaración de marca (`.statement` en el mockup): fondo oxide
 * de borde a borde con headline, párrafo y link subrayado.
 */
export default function Statement() {
  return (
    <div className={styles.statement}>
      <div className={`wrap ${styles.cols}`}>
        <Reveal>
          <h2>La estrategia correcta cambia el resultado.</h2>
        </Reveal>
        <Reveal>
          <p>
            Ejerzo el derecho con una convicción simple: los asuntos importantes merecen la
            atención directa de quien lleva el caso. Sin intermediarios, sin promesas vacías y
            con total franqueza sobre lo que puede esperar.
          </p>
          <a className={styles.link} href="#perfil">
            Conozca mi trayectoria
          </a>
        </Reveal>
      </div>
    </div>
  );
}
