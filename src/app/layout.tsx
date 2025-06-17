import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import ReduxProvider from "@/components/ReduxProvider";
import Header from "@/components/Header";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "jobchaser",
  description:
    "Find your dream job with Jobchaser, the ultimate job search platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <html lang="en" suppressHydrationWarning>
          <body>
            <Header />
            <main className="container mx-auto flex flex-col items-center">
              {children}
            </main>
            <Toaster richColors position="top-center" />
          </body>
        </html>
      </ThemeProvider>
    </ReduxProvider>
  );
}
