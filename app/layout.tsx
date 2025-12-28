import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/hooks/useCart";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import Providers from "./_lib/providers/providers";
import "./globals.css";
import { getCurrentSession } from "./_lib/services/authService";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose the weights you need
  variable: "--font-poppins", // optional for CSS variable usage
});

export const metadata: Metadata = {
  title: "Velisse",
  description:
    "Where elegance meets individuality. Explore refined footwear, couture apparel, and signature fragrances crafted for those who move with purpose and style.",
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${poppins.className} ${poppins.variable} antialiased bg-background`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider initialCount={0} isAuthenticated={!!session} token={session.access}>{children}</CartProvider>
          </ThemeProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
