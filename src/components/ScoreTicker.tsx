import styles from "./ScoreTicker.module.css";

const TICKS = [
  "Lady Slay D123 — Compete with purpose. Graduate with pride.",
  "Basketball · Season updates coming soon",
  "Volleyball · Region play tips off this fall",
  "Softball · Spring schedule drops soon",
  "Soccer · Fall campaign underway",
  "Latest · Short-form updates in the feed →",
];

export default function ScoreTicker() {
  const line = TICKS.join("   ·   ");

  return (
    <div className={styles.ticker} aria-label="Live scores and updates">
      <div className={styles.track}>
        <p className={styles.text}>
          LIVE SCORES &amp; UPDATES &nbsp;&nbsp; {line} &nbsp;&nbsp; {line}
        </p>
        <p className={styles.text} aria-hidden="true">
          LIVE SCORES &amp; UPDATES &nbsp;&nbsp; {line} &nbsp;&nbsp; {line}
        </p>
      </div>
    </div>
  );
}
