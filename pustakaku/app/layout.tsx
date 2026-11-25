import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "PustakaKu", template: "%s | PustakaKu" },
  description: "Aplikasi pencatatan buku perpustakaan SMA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-stone-50 text-gray-900 antialiased">
        <Navbar />
        <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-10">{children}</main>
      </body>
    </html>
  );
}
