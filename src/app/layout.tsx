import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "../context/WalletContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "DistriNova | Decentralized Startup Grants",
  description: "Built on GenLayer Studio by u_stacklabs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col antialiased`}>
        <WalletProvider>
          <Header />
          <main className="flex-grow flex flex-col relative">
            {children}
          </main>
          <Footer />
        </WalletProvider>
      </body>
    </html>
  );
}
