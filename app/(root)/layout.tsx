import type { Metadata } from "next";
import Header from "../_components/header/Header";
import MobileNavigations from "../_components/header/MobileNavigations";
import Footer from "../_components/reusable/Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "Velisse",
  description:
    "Where elegance meets individuality. Explore refined footwear, couture apparel, and signature fragrances crafted for those who move with purpose and style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` antialiased bg-background`}
      >
        <Header />
          {children} 
        <MobileNavigations />
        <Footer />
      </body>
    </html>
  );
}
