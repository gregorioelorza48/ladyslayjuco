import Link from "next/link";
import { games, sports } from "@/lib/data";

export const metadata = {
  title: "Schedule",
};

export default function SchedulePage() {
  const sportNames = Object.fromEntries(sports.map((s) => [s.slug, s.name]));

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Schedule</h1>
          <p>Upcoming games and results across all women&apos;s sports.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Sport</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Opponent</th>
                  <th>Location</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game.id}>
                    <td>
                      <Link href={`/sports/${game.sport}`}>{sportNames[game.sport]}</Link>
                    </td>
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
        </div>
      </section>
    </>
  );
}
