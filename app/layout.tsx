import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/useUser";


const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: "Threadles Design",
  description: "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body className={inter.className}>
        <UserProvider>
          <Header />
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <main style={{ paddingTop: '80px' }}>
            {children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
