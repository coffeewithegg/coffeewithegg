import "@cwe/ui/styles.css";
import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { Header } from "./_components/header";
import { Providers } from "./providers";

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
          <Providers>
            <Header />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
