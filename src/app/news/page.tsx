import Image from "next/image";
import Link from "next/link";
import { news, sports } from "@/lib/data";

export const metadata = {
  title: "News",
};

export default function NewsPage() {
  const sportNames = Object.fromEntries(sports.map((s) => [s.slug, s.name]));

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>News &amp; updates</h1>
          <p>Stories from our student-athletes, coaches, and programs.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {news.map((article) => (
              <li
                key={article.id}
                style={{
                  background: "var(--color-surface-raised)",
                  padding: "1.5rem",
                  marginBottom: "1rem",
                  borderRadius: "var(--radius)",
                  boxShadow: "var(--shadow)",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "flex-start",
                }}
              >
                {article.coverImage && (
                  <Link href={`/news/${article.id}`} style={{ flexShrink: 0, width: "180px" }}>
                    <Image
                      src={article.coverImage}
                      alt=""
                      width={360}
                      height={240}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "var(--radius)",
                        border: "1px solid var(--color-border)",
                      }}
                      sizes="180px"
                    />
                  </Link>
                )}
                <div>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", margin: "0 0 0.5rem" }}>
                  {article.date}
                  {article.sport && (
                    <> · {sportNames[article.sport]}</>
                  )}
                </p>
                <h2 style={{ fontSize: "1.35rem", margin: "0 0 0.5rem", color: "var(--color-title)" }}>
                  <Link href={`/news/${article.id}`}>{article.title}</Link>
                </h2>
                <p style={{ margin: "0 0 1rem", color: "var(--color-text-muted)" }}>{article.excerpt}</p>
                <Link href={`/news/${article.id}`} className="btn btn-primary">
                  Read more
                </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
