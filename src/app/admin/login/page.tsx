import {
  requestPasswordReset,
  signInWithPassword,
} from "@/app/admin/actions";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin login",
};

type Props = {
  searchParams: Promise<{
    error?: string;
    detail?: string;
    reset?: string;
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
            {params.reset === "sent" && (
              <p className={`${styles.message} ${styles.success}`}>
                Password reset email sent. Open it, then you&apos;ll be asked
                to choose a new password on this site.
              </p>
            )}
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

            <hr
              style={{
                border: 0,
                borderTop: "1px solid var(--color-border)",
                margin: "1.25rem 0",
              }}
            />

            <p className={styles.message}>Forgot password?</p>
            <form action={requestPasswordReset} className={styles.form}>
              <input
                type="hidden"
                name="email"
                value="gregorioelorza48@gmail.com"
              />
              <button type="submit" className="btn btn-secondary">
                Email me a reset link
              </button>
            </form>

            <p className={styles.message}>
              Fastest option: in Supabase → Authentication → Users → Add user,
              create this email with a password (no email needed).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
