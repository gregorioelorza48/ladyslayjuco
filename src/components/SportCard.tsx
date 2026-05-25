import Link from "next/link";
import type { Sport } from "@/lib/data";
import styles from "./SportCard.module.css";

interface SportCardProps {
  sport: Sport;
}

export default function SportCard({ sport }: SportCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.banner}>
        <h3>{sport.name}</h3>
      </div>
      <div className={styles.body}>
        <p className={styles.meta}>{sport.season}</p>
        <p className={styles.record}>{sport.record}</p>
        <p className={styles.description}>{sport.description}</p>
        <Link href={`/sports/${sport.slug}`} className={styles.link}>
          View team →
        </Link>
      </div>
    </article>
  );
}
