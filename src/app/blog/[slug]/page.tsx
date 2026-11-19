import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatPostDate,
  getPublishedPostBySlug,
  sportLabel,
} from "@/lib/posts";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.headline?.trim() || "Latest update",
    description: post.body.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className={styles.back}>
            <Link href="/">← Home</Link>
          </p>
          <p className={styles.meta}>
            {formatPostDate(post.published_at)}
            {post.sport && <> · {sportLabel(post.sport)}</>}
          </p>
          {post.headline ? <h1>{post.headline}</h1> : <h1>Latest update</h1>}
        </div>
      </div>
      <section className="section">
        <div className={`container ${styles.article}`}>
          {post.image_url && (
            <figure className={styles.figure}>
              <Image
                src={post.image_url}
                alt=""
                width={1200}
                height={800}
                className={styles.image}
                sizes="(max-width: 720px) 100vw, 720px"
              />
            </figure>
          )}
          <div className={styles.body}>{post.body}</div>
        </div>
      </section>
    </>
  );
}
