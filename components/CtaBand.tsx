import Link from "next/link";
import styles from "./CtaBand.module.css";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  description: string;
  button: {
    label: string;
    href: string;
  };
};

export default function CtaBand({ eyebrow, title, description, button }: CtaBandProps) {
  return (
    <section className={styles.ctaBand}>
      <div className="wrap">
        {eyebrow ? (
          <p className={`eyebrow center ${styles.eyebrowGold}`}>{eyebrow}</p>
        ) : null}
        <h2>{title}</h2>
        <p>{description}</p>
        <Link href={button.href} className="btn btn-gold">
          {button.label}
        </Link>
      </div>
    </section>
  );
}
