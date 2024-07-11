import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/useUser";
import ProgressBar from "@/components/ProgressBar";



const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: "Threadle Designs | Bespoke Tailoring & Ready-to-Wear Fashion in Malappuram, Kerala",
  keywords: "Threadle Designs, bespoke tailoring, ready-made fashion, women's fashion, custom clothing, curated collections, unique garments, ready-to-wear, online boutique, fashion store, Malappuram, Kerala, online clothing store, women's clothing, fashion trends, tailored outfits, stylish clothing, online shopping, quality craftsmanship, fashion enthusiasts, trendy styles",
  description: "Discover Threadle Designs in Malappuram, Kerala, where bespoke tailoring meets ready-made fashion. Our boutique offers custom clothing and curated collections, providing modern women with unique, stylish garments and a seamless online shopping experience.",
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
          <ProgressBar />
          <Toaster
            position="top-center"
            reverseOrder={false} />
          <main style={{ paddingTop: '80px' }}>
            {children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
