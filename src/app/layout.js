import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { ShipmentProvider } from "@/contexts/ShipmentContext";
import Navbar from "@/components/Navbar/Navbar";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Swiftpoint Logistics",
  description: "An International Transport and Logistic company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />{" "}
        <link rel="icon" href="/favicon.ico?v=6" />
      </Head>
      <body className={inter.className}>
        <ShipmentProvider>{children}</ShipmentProvider>
    <Script id="chatway" async={true} src="https://cdn.chatway.app/widget.js?id=8JCHPuDiaGcl"></Script>
      </body>
    </html>
  );
}
