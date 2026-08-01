import Link from "next/link";
import styles from "./AreaCards.module.css";

type AreaCard = {
  numeral: string;
  title: string;
  description: string;
  href: string;
};

type AreaCardsProps = {
  cards: AreaCard[];
};

/**
 * Grid de tarjetas de área de la portada (`.cards`/`.card` en el borrador).
 * Distinto de `PracticeIndex` (lista vertical de `/areas`): aquí es un
 * grid de 3 columnas con numerales romanos y descripciones cortas.
 */
export default function AreaCards({ cards }: AreaCardsProps) {
  return (
    <div className={styles.cards}>
      {cards.map((card) => (
        <Link key={card.numeral} className={styles.card} href={card.href}>
          <span className={styles.indexNum}>{card.numeral}</span>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </Link>
      ))}
    </div>
  );
}
