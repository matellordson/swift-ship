import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Swift Ship - Experience unmatched speed and efficiency",
  description:
    "Swift Ship offers fast, reliable shipping with eco-friendly practices and 24/7 support. Your packages arrive on time, everytime.",
  verification: {
    google: "FyacnK4bdNej-tyaUnkoDmM9O7zVKbCbTFvdD4gUkqc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div>{children}</div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
