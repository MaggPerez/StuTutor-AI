import type { Metadata } from "next";
import { Sora, Instrument_Serif, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/contexts/UserContext";
import { Toaster } from "@/components/ui/sonner";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["italic", "normal"],
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StuTutor",
  description: "An AI-powered platform to assist students with their studies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${instrumentSerif.variable} ${firaCode.variable} antialiased`}
      >
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
