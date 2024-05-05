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
  description: "Welcome to Threadle Designs, your premier destination for exquisite womens fashion in Malappuram, Kerala! Discover our diverse range of customizable clothing and accessories, thoughtfully crafted to reflect your unique taste and personality. With nationwide delivery across India, experience the convenience of shopping from anywhere. Elevate your wardrobe with our exclusive designs and enjoy unparalleled style, only at Threadle Designs.",
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
