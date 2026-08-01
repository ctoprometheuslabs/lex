"use client";

import styles from "./ContactForm.module.css";

const PRACTICE_AREAS = [
  "Derecho corporativo",
  "Litigios civiles y comerciales",
  "Derecho laboral",
  "Inmobiliario y contratos",
  "Familia y sucesiones",
  "Otra materia",
] as const;

/**
 * Formulario de contacto (`.form` en el mockup). Por ahora es solo
 * estructura visual: sin `fetch`, estados ni validación (eso llega en la
 * fase de backend, una vez se defina el contrato de `/api/contact`).
 */
export default function ContactForm() {
  return (
    <div className={styles.form}>
      <div className={styles.formRow}>
        <div className={styles.field}>
          <label htmlFor="f-nombre">Nombre completo</label>
          <input id="f-nombre" name="nombre" type="text" autoComplete="name" />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-tel">Teléfono</label>
          <input id="f-tel" name="telefono" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.field}>
          <label htmlFor="f-mail">Correo electrónico</label>
          <input id="f-mail" name="email" type="email" autoComplete="email" />
        </div>
        <div className={styles.field}>
          <label htmlFor="f-area">Área de consulta</label>
          <select id="f-area" name="area" defaultValue={PRACTICE_AREAS[0]}>
            {PRACTICE_AREAS.map((area) => (
              <option key={area}>{area}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="f-msg">Describa brevemente su situación</label>
        <textarea id="f-msg" name="mensaje" />
      </div>
      <p className={styles.formNote}>
        El envío de este formulario no crea una relación abogado–cliente.
      </p>
      {/* TODO (backend): conectar a POST /api/contact con estados de
          enviando/éxito/error una vez se defina el contrato. */}
      <button className={`pill ${styles.sendBtn}`} type="button">
        Enviar consulta
      </button>
      <div className={styles.formOk}>
        Su consulta fue enviada. Le responderé dentro de un día hábil. Gracias por su confianza.
      </div>
    </div>
  );
}
