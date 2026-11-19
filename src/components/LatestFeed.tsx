"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { loadMorePublishedPosts } from "@/app/actions/posts";
import {
  formatPostDate,
  previewBody,
  sportLabel,
  type Post,
} from "@/lib/post-shared";
import styles from "@/app/home.module.css";

type Props = {
  initialPosts: Post[];
  total: number;
  sportFilter?: string | null;
};

export default function LatestFeed({
  initialPosts,
  total,
  sportFilter = null,
}: Props) {
  const [posts, setPosts] = useState(initialPosts);
  const [pending, startTransition] = useTransition();

  const visible = useMemo(() => {
    if (!sportFilter) return posts;
    return posts.filter((p) => p.sport === sportFilter);
  }, [posts, sportFilter]);

  const featured = visible[0] ?? null;
  const rest = visible.slice(1);

  if (total === 0 && posts.length === 0) {
    return (
      <div className={styles.feedBlock}>
        <h2 className={styles.colTitle}>Recent feed</h2>
        <p className={styles.muted}>No posts yet. Check back soon.</p>
      </div>
    );
  }

  const hasMore = posts.length < total;

  function handleLoadMore() {
    startTransition(async () => {
      const { posts: next } = await loadMorePublishedPosts(posts.length);
      setPosts((prev) => [...prev, ...next]);
    });
  }

  return (
    <div className={styles.feedBlock}>
      {featured && (
        <article className={styles.featuredPost}>
          {featured.image_url && (
            <Link href={`/blog/${featured.slug}`} className={styles.featuredMedia}>
              <Image
                src={featured.image_url}
                alt=""
                width={1200}
                height={675}
                sizes="(max-width: 900px) 100vw, 70vw"
                priority
              />
            </Link>
          )}
          <div className={styles.featuredBody}>
            <p className={styles.kicker}>Featured update</p>
            <p className={styles.newsDate}>
              {formatPostDate(featured.published_at)}
              {featured.sport && <> · {sportLabel(featured.sport)}</>}
            </p>
            <h2 className={styles.featuredHeadline}>
              <Link href={`/blog/${featured.slug}`}>
                {featured.headline?.trim() || "Latest update"}
              </Link>
            </h2>
            <p className={styles.postPreview}>{previewBody(featured.body, 320)}</p>
            <Link href={`/blog/${featured.slug}`} className="btn btn-primary">
              Read post
            </Link>
          </div>
        </article>
      )}

      <div className={styles.chronoFeed}>
        <h2 className={styles.colTitle}>Recent chronological feed</h2>
        {rest.length === 0 && sportFilter ? (
          <p className={styles.muted}>No posts in this category yet.</p>
        ) : (
          <ul className={styles.feedList}>
            {rest.map((post) => (
              <li key={post.id} className={styles.feedItem}>
                {post.image_url && (
                  <Link href={`/blog/${post.slug}`} className={styles.feedThumb}>
                    <Image
                      src={post.image_url}
                      alt=""
                      width={320}
                      height={180}
                      sizes="120px"
                    />
                  </Link>
                )}
                <div>
                  <p className={styles.newsDate}>
                    {formatPostDate(post.published_at)}
                    {post.sport && <> · {sportLabel(post.sport)}</>}
                  </p>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>
                      {post.headline?.trim() || "View post"}
                    </Link>
                  </h3>
                  <p className={styles.postPreview}>{previewBody(post.body, 160)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {hasMore && (
          <p className={styles.loadMore}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleLoadMore}
              disabled={pending}
            >
              {pending ? "Loading…" : "Load more"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
