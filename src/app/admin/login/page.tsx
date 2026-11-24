import { requestMagicLink, verifyEmailCode } from "@/app/admin/actions";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin login",
};

type Props = {
  searchParams: Promise<{
    error?: string;
    sent?: string;
    detail?: string;
    email?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const email =
    params.email?.toLowerCase().trim() || "gregorioelorza48@gmail.com";

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Admin</h1>
          <p>Sign in with an email code to publish short-form posts.</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 480 }}>
          <div className={styles.panel}>
            {params.sent && (
              <p className={`${styles.message} ${styles.success}`}>
                Check your email for a one-time code, then enter it below.
                Don&apos;t click the email link if it fails — use the code.
              </p>
            )}
            {params.error === "forbidden" && (
              <p className={`${styles.message} ${styles.error}`}>
                That email is not authorized.
              </p>
            )}
            {params.error === "send" && (
              <p className={`${styles.message} ${styles.error}`}>
                Could not send the login email.
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
                Code expired or invalid. Request a new one.
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

            {!params.sent ? (
              <form action={requestMagicLink} className={styles.form}>
                <label className={styles.label}>
                  Email
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    defaultValue={email}
                  />
                </label>
                <button type="submit" className="btn btn-primary">
                  Send login code
                </button>
              </form>
            ) : (
              <form action={verifyEmailCode} className={styles.form}>
                <input type="hidden" name="email" value={email} />
                <label className={styles.label}>
                  Email
                  <input
                    className={styles.input}
                    type="email"
                    value={email}
                    disabled
                    readOnly
                  />
                </label>
                <label className={styles.label}>
                  One-time code from email
                  <input
                    className={styles.input}
                    type="text"
                    name="token"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    placeholder="123456"
                  />
                </label>
                <button type="submit" className="btn btn-primary">
                  Verify and sign in
                </button>
              </form>
            )}

            {params.sent && (
              <form action={requestMagicLink} className={styles.form} style={{ marginTop: "1rem" }}>
                <input type="hidden" name="email" value={email} />
                <button type="submit" className="btn btn-secondary">
                  Resend code
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
