import { requestMagicLink } from "@/app/admin/actions";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin login",
};

type Props = {
  searchParams: Promise<{ error?: string; sent?: string; detail?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Admin</h1>
          <p>Sign in with a magic link to publish short-form posts.</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 480 }}>
          <div className={styles.panel}>
            {params.sent && (
              <p className={`${styles.message} ${styles.success}`}>
                Check your email for the login link.
              </p>
            )}
            {params.error === "forbidden" && (
              <p className={`${styles.message} ${styles.error}`}>
                That email is not authorized.
              </p>
            )}
            {params.error === "send" && (
              <p className={`${styles.message} ${styles.error}`}>
                Could not send the magic link.
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
            {params.error === "auth" && (
              <p className={`${styles.message} ${styles.error}`}>
                Login link expired or invalid. Request a new one.
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
            <p className={styles.message}>
              Tip: after you request a link, open the email on this same phone
              or computer. If it still fails, update the Magic Link template in
              Supabase (see README).
            </p>
            <form action={requestMagicLink} className={styles.form}>
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
              <button type="submit" className="btn btn-primary">
                Send magic link
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
