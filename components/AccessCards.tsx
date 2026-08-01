import Link from "next/link";
import styles from "./AccessCards.module.css";

type AccessCard = {
  numeral: string;
  title: string;
  description: string;
  href: string;
};

type AccessCardsProps = {
  cards: AccessCard[];
};

/**
 * Tarjetas de acceso a las demás páginas (`.cards`/`.card` del borrador,
 * sección "Explore" de la portada). Cuatro accesos con numeral romano.
 */
export default function AccessCards({ cards }: AccessCardsProps) {
  return (
    <div className={styles.cards}>
      {cards.map((card) => (
        <Link key={card.numeral} className={styles.card} href={card.href}>
          <span className={styles.indexNum}>{card.numeral}</span>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <span className={styles.go}>Ver más →</span>
        </Link>
      ))}
    </div>
  );
}
