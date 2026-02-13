import type { Metadata } from "next";
import { Crimson_Text } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { LibraryBackground } from "@/components/library/LibraryBackground";

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: "Smart Bookmark Hub",
  description: "Your private, real-time bookmark manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${crimsonText.variable} font-serif antialiased`}>
        <LibraryBackground>
          {children}
        </LibraryBackground>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
