import { Header } from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ignite Shop 2.0",
    default: "Home | Ignite Shop 2.0",
  },
  description: "Developed by Bruno Dias.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.className} min-h-screen bg-base-gray-1 text-base-gray-5 antialiased `}
      >
        <Header />
        <main className="flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
