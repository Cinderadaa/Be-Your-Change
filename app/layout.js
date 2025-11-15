import "./globals.css";

export const metadata = {
  title: "Be Your Change – Journey Within",
  description: "Interactive storytelling self-reflection journey."
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}