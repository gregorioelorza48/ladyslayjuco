import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="container">
        <h1>Page not found</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
