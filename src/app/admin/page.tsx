import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/admin/actions";
import { getAdminSession } from "@/lib/auth";
import {
  formatPostDate,
  getAllPostsForAdmin,
  sportLabel,
} from "@/lib/posts";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const user = await getAdminSession();
  if (!user) redirect("/admin/login");

  const posts = await getAllPostsForAdmin();

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Admin</h1>
          <p>Publish short-form updates for the Latest feed.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className={styles.toolbar}>
            <p className={styles.meta}>Signed in as {user.email}</p>
            <div className={styles.actions}>
              <Link href="/admin/new" className="btn btn-primary">
                New post
              </Link>
              <form action={signOut}>
                <button type="submit" className="btn btn-secondary">
                  Sign out
                </button>
              </form>
            </div>
          </div>

          <div className={styles.panel}>
            {posts.length === 0 ? (
              <p className={styles.meta}>No posts yet.</p>
            ) : (
              <ul className={styles.list}>
                {posts.map((post) => (
                  <li key={post.id} className={styles.listItem}>
                    <div>
                      <p className={styles.meta}>
                        {formatPostDate(post.created_at)}
                        {post.sport && <> · {sportLabel(post.sport)}</>}
                        <span
                          className={`${styles.badge} ${
                            post.status === "published"
                              ? styles.badgePublished
                              : ""
                          }`}
                        >
                          {post.status}
                        </span>
                      </p>
                      <h2
                        style={{
                          fontSize: "1.15rem",
                          margin: "0.35rem 0",
                          color: "var(--color-title)",
                        }}
                      >
                        {post.headline?.trim() || "Untitled post"}
                      </h2>
                      <p className={styles.meta}>
                        {post.body.slice(0, 120)}
                        {post.body.length > 120 ? "…" : ""}
                      </p>
                    </div>
                    <div className={styles.actions}>
                      <Link
                        href={`/admin/edit/${post.id}`}
                        className="btn btn-secondary"
                      >
                        Edit
                      </Link>
                      {post.status === "published" && (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="btn btn-secondary"
                        >
                          View
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
