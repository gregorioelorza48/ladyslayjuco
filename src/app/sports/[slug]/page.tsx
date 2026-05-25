import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSport,
  getGamesBySport,
  getPlayersBySport,
  sports,
  type SportSlug,
} from "@/lib/data";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return sports.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const sport = getSport(slug);
  return { title: sport?.name ?? "Sport" };
}

export default async function SportPage({ params }: PageProps) {
  const { slug } = await params;
  const sport = getSport(slug);
  if (!sport) notFound();

  const sportGames = getGamesBySport(slug as SportSlug);
  const sportPlayers = getPlayersBySport(slug as SportSlug);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link href="/sports" style={{ color: "var(--color-pink-light)", fontSize: "0.9rem" }}>
            ← All sports
          </Link>
          <h1>{sport.name}</h1>
          <p>
            {sport.season} · Record: {sport.record}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <nav className={styles.tabs} aria-label="Team sections">
            <a href="#overview" className={styles.tab}>
              Overview
            </a>
            <a href="#schedule" className={styles.tab}>
              Schedule
            </a>
            <a href="#roster" className={styles.tab}>
              Roster
            </a>
          </nav>

          <div id="overview" className={styles.infoGrid}>
            <div>
              <h2 className="section-title">Program overview</h2>
              <p>{sport.description}</p>
              {sport.nextGame && (
                <p style={{ marginTop: "1rem" }}>
                  <strong>Up next:</strong> {sport.nextGame}
                </p>
              )}
            </div>
            <aside className={styles.sidebar}>
              <h3>Quick facts</h3>
              <p>
                <strong>Season:</strong> {sport.season}
              </p>
              <p>
                <strong>Record:</strong> {sport.record}
              </p>
              <p>
                <strong>Conference:</strong> NJCAA Region XIV
              </p>
              <Link href="/recruiting" className="btn btn-primary" style={{ marginTop: "1rem", width: "100%" }}>
                Recruiting
              </Link>
            </aside>
          </div>

          <div id="schedule" style={{ marginTop: "3rem" }}>
            <h2 className="section-title">Schedule &amp; results</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Opponent</th>
                    <th>Location</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {sportGames.map((game) => (
                    <tr key={game.id}>
                      <td>{game.date}</td>
                      <td>{game.time}</td>
                      <td>{game.opponent}</td>
                      <td>{game.location}</td>
                      <td>{game.result ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: "1rem" }}>
              <Link href="/schedule">View full athletics schedule →</Link>
            </p>
          </div>

          <div id="roster" style={{ marginTop: "3rem" }}>
            <h2 className="section-title">Roster</h2>
            <div className={styles.rosterGrid}>
              {sportPlayers.map((player) => (
                <article key={player.id} className={styles.playerCard}>
                  <span className={styles.playerNumber}>#{player.number}</span>
                  <h3 className={styles.playerName}>{player.name}</h3>
                  <p className={styles.playerMeta}>
                    {player.position} · {player.year}
                  </p>
                  <p className={styles.playerMeta}>{player.hometown}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
