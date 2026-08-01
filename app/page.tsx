import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import AreaIndex from "@/components/AreaIndex";
import PhotoBand from "@/components/PhotoBand";
import Profile from "@/components/Profile";
import Steps from "@/components/Steps";
import Quote from "@/components/Quote";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import styles from "./page.module.css";

const AREAS = [
  {
    num: "01",
    title: "Derecho corporativo",
    description:
      "Sociedades, pactos de accionistas, fusiones y adquisiciones, y asesoría permanente a empresas y directorios.",
  },
  {
    num: "02",
    title: "Litigios civiles y comerciales",
    description:
      "Representación estratégica en juicios, disputas contractuales, cobranzas complejas y arbitrajes.",
  },
  {
    num: "03",
    title: "Derecho laboral",
    description:
      "Defensa de empleadores y ejecutivos: desvinculaciones, cumplimiento normativo y negociación.",
  },
  {
    num: "04",
    title: "Inmobiliario y contratos",
    description:
      "Estudios de títulos, compraventas, arriendos comerciales y estructuración de operaciones.",
  },
  {
    num: "05",
    title: "Familia y sucesiones",
    description:
      "Planificación patrimonial y sucesoria, testamentos y protección del patrimonio familiar.",
  },
] as const;

const CREDENTIALS = [
  {
    label: "Formación",
    value: "Licenciado en Derecho, Universidad de Chile · LL.M., [Universidad extranjera]",
  },
  { label: "Admisión", value: "Abogado habilitado, Corte Suprema de Chile" },
  {
    label: "Experiencia",
    value: "Ex asociado senior en firma de primer nivel · Asesor de directorios",
  },
  { label: "Idiomas", value: "Español · Inglés" },
];

export default function Home() {
  return (
    <main id="top">
      <Hero
        image="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Columnas de un edificio de tribunales"
      />

      <Statement />

      <section id="areas">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <p className="label">Áreas de práctica</p>
              <h2>Cinco áreas. Un mismo estándar.</h2>
            </div>
            <p className="note">
              Si su asunto no corresponde a estas materias, se lo diré con honestidad y lo
              orientaré hacia el especialista correcto.
            </p>
          </Reveal>
          <Reveal>
            <AreaIndex areas={AREAS} />
          </Reveal>
        </div>
      </section>

      <PhotoBand
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Documentos legales y pluma sobre un escritorio"
      />

      <Profile
        image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80"
        imageAlt="Retrato del abogado"
        credentials={CREDENTIALS}
      />

      <Steps />

      <Quote />

      <section id="contacto">
        <div className="wrap">
          <div className={styles.contactGrid}>
            <Reveal className={styles.contactInfo}>
              <p className="label">Contacto</p>
              <h2>Cuénteme su caso.</h2>
              <p>
                Le respondo dentro de un día hábil. Toda la información que envíe es
                estrictamente confidencial.
              </p>
              <div className={styles.contactLines}>
                <div>
                  <b>Teléfono</b>
                  <span>+56 9 0000 0000</span>
                </div>
                <div>
                  <b>Correo</b>
                  <span>contacto@grantlaw.com</span>
                </div>
                <div>
                  <b>Oficina</b>
                  <span>Av. [Dirección] 000, Of. 000, Las Condes, Santiago</span>
                </div>
                <div>
                  <b>Horario</b>
                  <span>Lunes a viernes · 9:00 – 18:30 hrs</span>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
