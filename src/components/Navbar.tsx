"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/tier-list", label: "Tier Lists" },
  { href: "/classes", label: "Classes" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold wow-gold wow-gold-glow tracking-tight">
            ⚔️ Honor.gg
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full font-mono">
            Midnight 12.0.5
          </span>
        </div>
      </div>
    </header>
  );
}
