import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NecesitoVisa.com",
  description: "Find out in seconds if you need a visa for your next trip.",
  metadataBase: new URL("https://necesitovisa.com"),
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="container-box flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-2 font-semibold text-lg text-brand-dark">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary text-white font-bold">
                NV
              </span>
              <span>NecesitoVisa.com</span>
            </Link>
            <nav className="flex items-center space-x-4 text-sm text-slate-600">
              <Link href="/">Home</Link>
              <Link href="/visa">Visas</Link>
              <Link href="/faq">FAQ</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-16 border-t border-slate-200 bg-white">
          <div className="container-box py-10 text-sm text-slate-600 space-y-2">
            <p className="font-semibold text-slate-900">Disclaimer</p>
            <p>
              This information is for reference only. Always verify with the embassy or official sources
              before traveling. We are not responsible for changes in immigration policies.
            </p>
            <p className="text-slate-500">© {new Date().getFullYear()} NecesitoVisa.com</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
