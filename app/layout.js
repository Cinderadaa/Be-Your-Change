import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Be Your Change – Journey Within",
  description: "Interactive storytelling self-reflection journey.",
  icons: {
    icon: "/byc_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="byc-body">
        <header className="glass-nav">
          <div className="glass-nav-inner">
            <Link href="/" className="glass-nav-left">
              <Image
                src="/byc_logo.png"
                alt="Be Your Change logo"
                width={40}
                height={40}
                className="glass-logo"
              />
              <div className="glass-nav-text">
                <span className="glass-nav-title">Be Your Change</span>
                <span className="glass-nav-subtitle">Journey Within</span>
              </div>
            </Link>
            <div className="glass-nav-right">
              <a
                href="/about"
                className="glass-link glass-link-secondary"
              >
                About
              </a>
              <a
                href="https://www.instagram.com/beyourchange.kmutt?igsh=dmVtbXZrN2hqMmxx&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="glass-link glass-link-secondary"
              >
                IG
              </a>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}