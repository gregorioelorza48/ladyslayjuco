import Image from "next/image";
import Link from "next/link";
import SportCard from "@/components/SportCard";
import { site, sports, news } from "@/lib/data";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="badge">{site.njcaa}</span>
          <h1>{site.programName}</h1>
          <p>{site.tagline}</p>
          <div className={styles.heroActions}>
            <Link href="/sports" className="btn btn-primary">
              Explore sports
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div>
              <span className={styles.statValue}>4</span>
              <span className={styles.statLabel}>Varsity sports</span>
            </div>
          
        
         
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Womens D123 sports</h2>
          <p className="section-subtitle">
            
          </p>
          <div className="card-grid">
            {sports.map((sport) => (
              <SportCard key={sport.slug} sport={sport} />
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.featured}`}>
        <div className="container">
          <h2 className="section-title">Latest news</h2>
          <p className="section-subtitle">Updates from the field and the classroom.</p>
          <ul className={styles.newsList}>
            {news.map((article) => (
              <li key={article.id} className={styles.newsItem}>
                {article.coverImage && (
                  <Link href={`/news/${article.id}`} className={styles.newsThumb}>
                    <Image
                      src={article.coverImage}
                      alt=""
                      width={640}
                      height={360}
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </Link>
                )}
                <div>
                  <p className={styles.newsDate}>{article.date}</p>
                  <h3>
                    <Link href={`/news/${article.id}`}>{article.title}</Link>
                  </h3>
                  <p>{article.excerpt}</p>
                </div>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: "1.5rem" }}>
            <Link href="/news" className="btn btn-primary">
              All news
            </Link>
          </p>
        </div>
      </section>

      
    </>
  );
}
