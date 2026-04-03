import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";

import Providers from "./providers"
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ofertas da Vez",
    template: "%s | Ofertas da Vez",
  },
  description:
    "Base Next.js preparada para replicar com fidelidade visual e funcional o projeto de ofertas vindo do Lovable.",
  applicationName: "Ofertas da Vez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
