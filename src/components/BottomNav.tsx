"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 w-full bg-card border-t border-border shadow-t-lg">
      <div className="flex justify-around items-center h-16">
        <Link href="/" className={`flex flex-col items-center justify-center transition-colors ${pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
          <Home className="h-6 w-6" />
          <span className="text-xs">Início</span>
        </Link>
        <Link href="/sobre" className={`flex flex-col items-center justify-center transition-colors ${pathname === "/sobre" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
          <FileText className="h-6 w-6" />
          <span className="text-xs">Sobre</span>
        </Link>
      </div>
    </nav>
  );
}
