import styles from "./Quotes.module.css";

type Quote = {
  quote: string;
  author: string;
  context: string;
};

type QuotesProps = {
  quotes: Quote[];
};

export default function Quotes({ quotes }: QuotesProps) {
  return (
    <div className={styles.quotes}>
      {quotes.map((item) => (
        <blockquote key={item.author} className={styles.blockquote}>
          <p>{item.quote}</p>
          <footer>
            <b>{item.author}</b>
            {item.context}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
