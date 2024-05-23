import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/useUser";
import ProgressBar from "@/components/ProgressBar";
import connectMongoDB from "@/libs/db";



const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: "Threadle Designs",
  keywords: "Threadle Designs, bespoke tailoring, ready-made fashion, modern women's fashion, customization, curated collections, unique garments, ready-to-wear fashion, online boutique, fashion store, Malappuram, Kerala, best online selling store, women's clothing, fashion trends, style and convenience, tailored ensembles, fashion-forward designs, online shopping experience, quality craftsmanship, fashion enthusiasts, trendsetting styles",
  description: "At Threadle Designs, we blend the artistry of bespoke tailoring with the convenience of ready-made fashion to cater to the diverse needs of modern women. Our boutique offers a seamless fusion of customization and curated collections, ensuring every customer finds their perfect ensemble, whether they seek a uniquely crafted garment or a ready-to-wear masterpiece.",
};

export const fetchCache = 'force-no-store';

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
