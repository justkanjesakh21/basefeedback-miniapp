"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, UserRound } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      <Link href="/" className={pathname === "/" ? "active" : ""}>
        <House size={18} />
        <span>Home</span>
      </Link>
      <Link href="/me" className={pathname === "/me" ? "active" : ""}>
        <UserRound size={18} />
        <span>My</span>
      </Link>
    </nav>
  );
}

