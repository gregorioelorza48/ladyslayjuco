import SportCard from "@/components/SportCard";
import { sports } from "@/lib/data";

export const metadata = {
  title: "Sports",
};

export default function SportsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Sports</h1>
          <p>Women&apos;s varsity programs at the junior college level.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="card-grid">
            {sports.map((sport) => (
              <SportCard key={sport.slug} sport={sport} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
