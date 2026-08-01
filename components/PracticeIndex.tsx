import Link from "next/link";
import styles from "./PracticeIndex.module.css";

type PracticeArea = {
  numeral: string;
  title: string;
  description: string;
  href: string;
};

type PracticeIndexProps = {
  areas: PracticeArea[];
};

export default function PracticeIndex({ areas }: PracticeIndexProps) {
  return (
    <div className={styles.index}>
      {areas.map((area) => (
        <Link key={area.numeral} className={styles.indexRow} href={area.href}>
          <span className={styles.indexNum}>{area.numeral}</span>
          <span className={styles.indexBody}>
            <h3>{area.title}</h3>
            <p>{area.description}</p>
          </span>
          <span className={styles.indexGo}>Consultar →</span>
        </Link>
      ))}
    </div>
  );
}
