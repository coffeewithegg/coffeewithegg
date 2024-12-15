import "@cwe/ui/styles.css";
import "./globals.css";

import { Header } from "./_components/header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CWE | Dashboard",
  description: "List of all projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg01">
        <Header />
        {children}
      </body>
    </html>
  );
}
