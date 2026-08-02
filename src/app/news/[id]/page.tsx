import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsArticle, news, sports, type NewsBlock } from "@/lib/data";
import styles from "./page.module.css";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return news.map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const article = getNewsArticle(id);
  if (!article) return { title: "Article not found" };
  return { title: article.title };
}

function renderBlock(block: NewsBlock, index: number) {
  if (block.type === "image") {
    return (
      <figure key={index} className={styles.figure}>
        <Image
          src={block.src}
          alt={block.alt}
          width={1200}
          height={800}
          className={styles.image}
          sizes="(max-width: 720px) 100vw, 720px"
        />
      </figure>
    );
  }

  const isCaption = block.value.startsWith("(");

  return (
    <p
      key={index}
      className={isCaption ? styles.caption : styles.paragraph}
    >
      {block.value}
    </p>
  );
}

export default async function NewsArticlePage({ params }: Props) {
  const { id } = await params;
  const article = getNewsArticle(id);
  if (!article) notFound();

  const sportNames = Object.fromEntries(sports.map((s) => [s.slug, s.name]));
  const blocks: NewsBlock[] =
    article.blocks ??
    (article.body ?? [article.excerpt]).map((value) => ({ type: "text", value }));

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p style={{ margin: "0 0 0.75rem", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
            <Link href="/news">← All news</Link>
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", margin: "0 0 0.5rem" }}>
            {article.date}
            {article.sport && <> · {sportNames[article.sport]}</>}
          </p>
          <h1>{article.title}</h1>
          {!article.blocks && !article.body && (
            <p style={{ marginBottom: 0, color: "var(--color-text-muted)" }}>{article.excerpt}</p>
          )}
        </div>
      </div>
      <section className="section">
        <div className={`container ${styles.article}`}>
          {blocks.map(renderBlock)}
          {article.sourceUrl && (
            <p className={styles.source}>
              Source:{" "}
              <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
                Mizzou Athletics
              </a>
            </p>
            
          )}
          <h1>Story by Julia Ebelhar</h1>
        </div>
      </section>
    </>
  );
}
