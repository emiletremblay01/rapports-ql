import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import SidebarLeft from "@/components/sidebar-left";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reports App",
  description: "App with a feed of reports from the team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          process.env.NODE_ENV === "development" && "debug-screens"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarLeft className="absolute border-r p-4 min-h-screen flex flex-col items-center justify-between" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
