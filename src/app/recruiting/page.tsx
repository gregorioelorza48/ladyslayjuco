import { sports } from "@/lib/data";
import styles from "./page.module.css";

export const metadata = {
  title: "Recruiting",
};

export default function RecruitingPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Recruiting</h1>
          <p>Take the next step toward playing women&apos;s athletics at the JUCO level.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.checklist}>
              <h2 className="section-title">What we look for</h2>
              <ul>
                <li>NCAA / NJCAA eligibility (high school transcript)</li>
                <li>Commitment to academics and team culture</li>
                <li>Club, high school, or transfer film / stats</li>
                <li>Character references from coaches or counselors</li>
              </ul>
              <h3 style={{ marginTop: "1.5rem", fontSize: "1rem" }}>Contact athletics</h3>
              <p>
                <strong>Email:</strong> recruiting@riversidecc.edu
                <br />
                <strong>Phone:</strong> (555) 123-4567
              </p>
            </div>

            <form className={styles.form} action="#" method="post">
              <h2 style={{ marginTop: 0, fontSize: "1.25rem" }}>Recruiting questionnaire</h2>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                Frontend demo — connect to your backend or form service later.
              </p>

              <div className={styles.field}>
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" required />
              </div>

              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />
              </div>

              <div className={styles.field}>
                <label htmlFor="sport">Sport of interest</label>
                <select id="sport" name="sport" required>
                  <option value="">Select a sport</option>
                  {sports.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="year">High school graduation year</label>
                <input id="year" name="year" type="text" placeholder="e.g. 2026" />
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Tell us about yourself</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Position, stats, awards, academic goals..."
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit interest form
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
