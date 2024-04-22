import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import SidebarLeft from "@/components/async/sidebar-left";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "Reports App",
  description: "App with a feed of reports from the team",
};

export default function TopLevelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          process.env.NODE_ENV === "development" && "debug-screens",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
