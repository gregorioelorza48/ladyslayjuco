import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import PostEditor from "@/components/PostEditor";
import { getAdminSession } from "@/lib/auth";
import { getPostByIdForAdmin } from "@/lib/posts";
import styles from "../../admin.module.css";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const post = await getPostByIdForAdmin(id);
  return {
    title: post?.headline?.trim()
      ? `Edit: ${post.headline}`
      : "Edit post",
  };
}

export default async function AdminEditPostPage({ params }: Props) {
  const user = await getAdminSession();
  if (!user) redirect("/admin/login");

  const { id } = await params;
  const post = await getPostByIdForAdmin(id);
  if (!post) notFound();

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className={styles.meta}>
            <Link href="/admin">← All posts</Link>
          </p>
          <h1>Edit post</h1>
          <p className={styles.meta}>
            Status: {post.status}
            {post.status === "published" && (
              <>
                {" "}
                ·{" "}
                <Link href={`/blog/${post.slug}`}>View public page</Link>
              </>
            )}
          </p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className={styles.panel}>
            <PostEditor post={post} />
          </div>
        </div>
      </section>
    </>
  );
}
