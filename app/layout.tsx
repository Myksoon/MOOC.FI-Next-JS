import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog app",
  description: "Full Stack Open: Next.js blog app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <Link href="/">home</Link>
          <Link href="/blogs">blogs</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
