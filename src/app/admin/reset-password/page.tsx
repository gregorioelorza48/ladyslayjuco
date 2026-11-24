import { updatePassword } from "@/app/admin/actions";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Choose a new password",
};

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Choose a new password</h1>
          <p>Set a password for your admin account.</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 480 }}>
          <div className={styles.panel}>
            {params.error && (
              <p className={`${styles.message} ${styles.error}`}>
                {params.error}
              </p>
            )}
            <form action={updatePassword} className={styles.form}>
              <label className={styles.label}>
                New password
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </label>
              <label className={styles.label}>
                Confirm password
                <input
                  className={styles.input}
                  type="password"
                  name="confirm"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
              </label>
              <button type="submit" className="btn btn-primary">
                Save password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
