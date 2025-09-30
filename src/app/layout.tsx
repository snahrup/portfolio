import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Load Inter font for non-Apple devices
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Steve Nahrup Portfolio",
  description: "Interactive portfolio showcasing BI architecture, data analytics, and marketing measurement expertise. 14+ years building enterprise analytics platforms with Power BI, Microsoft Fabric, and cloud-native data systems.",
  keywords: [
    "Steve Nahrup", 
    "Portfolio", 
    "Business Intelligence",
    "Data Analytics",
    "Marketing Analytics",
    "Power BI",
    "Microsoft Fabric",
    "Data Engineering",
    "Attribution Modeling",
    "BI Architecture",
    "Enterprise Analytics",
    "Next.js",
    "React"
  ],
  authors: [
    {
      name: "Steve Nahrup",
      url: "https://snahrup.vercel.app",
    },
  ],
  creator: "Steve Nahrup",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://snahrup.vercel.app",
    title: "Steve Nahrup - Business Intelligence Architect & Strategist",
    description: "14+ years building enterprise BI platforms, marketing analytics, and data-driven growth strategy. Power BI • Microsoft Fabric • Attribution Modeling",
    siteName: "Steve Nahrup Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steve Nahrup - Business Intelligence Architect & Strategist",
    description: "Enterprise BI architecture • Marketing analytics • Data-driven growth strategy",
    creator: "@snahrup",
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        sizes: "any",
      }
    ],
    shortcut: "/favicon.svg?v=2",
    apple: "/apple-touch-icon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}