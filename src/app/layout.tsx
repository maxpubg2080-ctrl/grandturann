import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "GrandTuran — Telegram boshqaruv platformasi",
  description: "Manage Telegram channels, groups, scheduled posts, and delivery workflows with GrandTuran.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz">
      <body className="antialiased">{children}</body>
    </html>
  );
}
