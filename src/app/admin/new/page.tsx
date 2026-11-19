import Link from "next/link";
import { redirect } from "next/navigation";
import PostEditor from "@/components/PostEditor";
import { getAdminSession } from "@/lib/auth";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "New post",
};

export default async function AdminNewPostPage() {
  const user = await getAdminSession();
  if (!user) redirect("/admin/login");

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className={styles.meta}>
            <Link href="/admin">← All posts</Link>
          </p>
          <h1>New post</h1>
          <p>Write a short update for the Latest feed.</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className={styles.panel}>
            <PostEditor />
          </div>
        </div>
      </section>
    </>
  );
}
