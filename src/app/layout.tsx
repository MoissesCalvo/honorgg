import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Honor.gg — WoW Tier Lists & Guides",
  description:
    "The best World of Warcraft tier lists, class rankings, and guides for Mythic+, Raid, and PvP in Midnight (12.0).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <TooltipProvider>
          <Navbar />
          <main>{children}</main>
          <footer className="border-t border-border mt-20 py-8 text-center text-muted-foreground text-sm">
            <p>
              Honor.gg &mdash; Not affiliated with Blizzard Entertainment &bull; World of Warcraft: Midnight
            </p>
          </footer>
        </TooltipProvider>
      </body>
    </html>
  );
}
