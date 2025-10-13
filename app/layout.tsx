import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./_components/header/Header";
import MobileNavigations from "./_components/header/MobileNavigations";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose the weights you need
  variable: "--font-poppins", // optional for CSS variable usage
});

export const metadata: Metadata = {
  title: "Velisse",
  description: "Where elegance meets individuality. Explore refined footwear, couture apparel, and signature fragrances crafted for those who move with purpose and style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={` ${poppins.className} ${poppins.variable} antialiased bg-background`}
      >
        <Header />
        {children}
        <MobileNavigations />
      </body>
    </html>
  );
}
