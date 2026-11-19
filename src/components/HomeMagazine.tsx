"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LatestFeed from "@/components/LatestFeed";
import { site, type NewsArticle } from "@/lib/data";
import type { Post } from "@/lib/post-shared";
import styles from "@/app/home.module.css";

const CATEGORIES: { label: string; sport: string | null }[] = [
  { label: "All", sport: null },
  { label: "Hoops", sport: "basketball" },
  { label: "Volley", sport: "volleyball" },
  { label: "Softball", sport: "softball" },
  { label: "Soccer", sport: "soccer" },
];

type Props = {
  initialPosts: Post[];
  total: number;
  articles: NewsArticle[];
};

export default function HomeMagazine({
  initialPosts,
  total,
  articles,
}: Props) {
  const [sportFilter, setSportFilter] = useState<string | null>(null);

  return (
    <section className={styles.magazine}>
      <div className={`container ${styles.magazineInner}`}>
        <div className={styles.magazineGrid}>
          <main className={styles.mainCol}>
            <LatestFeed
              initialPosts={initialPosts}
              total={total}
              sportFilter={sportFilter}
            />
          </main>

          <aside className={styles.sideCol}>
            <div className={styles.sidePanel}>
              <h2 className={styles.sideTitle}>About the pivot</h2>
              <p className={styles.sideText}>
                Short-form, fan-first coverage for {site.schoolName}. Live
                updates in the feed, deeper stories in Articles.
              </p>
              <p className={styles.sideMission}>{site.tagline}</p>
            </div>

            <div className={styles.sidePanel}>
              <h2 className={styles.sideTitle}>Categories</h2>
              <div className={styles.filters}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.label}
                    type="button"
                    className={`${styles.filterBtn} ${
                      sportFilter === cat.sport ? styles.filterActive : ""
                    }`}
                    onClick={() => setSportFilter(cat.sport)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.sidePanel}>
              <h2 className={styles.sideTitle}>Articles</h2>
              <ul className={styles.articleList}>
                {articles.map((article) => (
                  <li key={article.id} className={styles.articleItem}>
                    {article.coverImage && (
                      <Link
                        href={`/news/${article.id}`}
                        className={styles.articleThumb}
                      >
                        <Image
                          src={article.coverImage}
                          alt=""
                          width={360}
                          height={200}
                          sizes="100px"
                        />
                      </Link>
                    )}
                    <div>
                      <p className={styles.newsDate}>{article.date}</p>
                      <h3>
                        <Link href={`/news/${article.id}`}>{article.title}</Link>
                      </h3>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/news" className={styles.sideLink}>
                All articles →
              </Link>
            </div>

            <div className={styles.sidePanel}>
              <h2 className={styles.sideTitle}>Newsletter</h2>
              <p className={styles.sideText}>
                Get scores and short updates in your inbox.
              </p>
              <form
                className={styles.newsletter}
                action="#"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className={styles.srOnly} htmlFor="newsletter-email">
                  Email
                </label>
                <input
                  id="newsletter-email"
                  className={styles.newsletterInput}
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
              </form>
              <p className={styles.muted}>Frontend demo — connect later.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
