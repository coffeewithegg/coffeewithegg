import "@cwe/ui/styles.css";
import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { Header } from "./_components/header";
import { DashboardProvider } from "./context";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CWE | Dashboard",
  description: "List of all projects",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className="bg-bg01">
        <NextIntlClientProvider messages={messages}>
          <DashboardProvider>
            <Header />
            {children}
          </DashboardProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
