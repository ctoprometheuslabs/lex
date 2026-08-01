import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Agende una consulta confidencial con Grant Law. Le respondo dentro de un día hábil.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHead
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Pasillo de oficinas"
        crumb="Inicio · Contact"
        title="Agende una consulta confidencial."
      />

      <section>
        <div className="wrap">
          <div className={styles.contactGrid}>
            <Reveal className={styles.contactInfo}>
              <p className="eyebrow">Contacto</p>
              <h2 style={{ fontSize: "clamp(26px,3vw,36px)", marginTop: 16 }}>
                Le respondo dentro de un día hábil.
              </h2>
              <p>
                Cuénteme brevemente su situación. Toda la información que me envíe es
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
