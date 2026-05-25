import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.programName} | ${site.schoolName}`,
    template: `%s | ${site.programName}`,
  },
  description:
    "Official women's junior college athletics — schedules, rosters, news, and recruiting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
