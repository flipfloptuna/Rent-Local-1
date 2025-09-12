import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Rent Local — Borrow. Don't Buy.",
  description: "A local marketplace to rent what you need, share what you don’t.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container-narrow py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
