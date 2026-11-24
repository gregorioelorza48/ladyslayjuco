import { signInWithPassword } from "@/app/admin/actions";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin login",
};

type Props = {
  searchParams: Promise<{
    error?: string;
    detail?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Admin</h1>
          <p>Sign in with your admin email and password.</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 480 }}>
          <div className={styles.panel}>
            {params.error === "forbidden" && (
              <p className={`${styles.message} ${styles.error}`}>
                That email is not authorized.
              </p>
            )}
            {params.error === "auth" && (
              <p className={`${styles.message} ${styles.error}`}>
                Sign-in failed.
                {params.detail ? (
                  <>
                    <br />
                    <span style={{ fontSize: "0.85rem" }}>
                      Details: {params.detail}
                    </span>
                  </>
                ) : null}
              </p>
            )}

            <form action={signInWithPassword} className={styles.form}>
              <label className={styles.label}>
                Email
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  defaultValue="gregorioelorza48@gmail.com"
                />
              </label>
              <label className={styles.label}>
                Password
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                />
              </label>
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </form>

            <p className={styles.message}>
              Set this user&apos;s password in Supabase → Authentication →
              Users (or use &quot;Send password recovery&quot; once).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
