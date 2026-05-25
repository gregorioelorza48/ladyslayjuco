import Link from "next/link";
import { site, sports } from "@/lib/data";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <h3>{site.programName}</h3>
            <p className={styles.tagline}>{site.tagline}</p>
            <p>
              <strong>{site.njcaa}</strong>
            </p>
          </div>
          <div>
            <h3>Sports</h3>
            <ul>
              {sports.map((sport) => (
                <li key={sport.slug}>
                  <Link href={`/sports/${sport.slug}`}>{sport.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Quick links</h3>
            <ul>
              <li>
                <Link href="/schedule">Full schedule</Link>
              </li>
              <li>
                <Link href="/recruiting">Recruiting</Link>
              </li>
              <li>
                <Link href="/news">News &amp; updates</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className={styles.bottom}>
          © {new Date().getFullYear()} {site.schoolName}. Women&apos;s Athletics. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
