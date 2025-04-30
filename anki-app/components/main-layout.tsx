"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, BarChart2, Search, User, Play } from "lucide-react"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b border-border h-12 flex items-center px-4">
        <h1 className="text-lg font-medium text-center flex-1">AnkiApp</h1>
      </header>

      <main className="flex-1 overflow-auto">{children}</main>

      <nav className="border-t border-border h-14 grid grid-cols-5">
        <Link
          href="/decks"
          className={`flex flex-col items-center justify-center text-xs ${
            pathname.includes("/decks") || pathname === "/" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link
          href="/stats"
          className={`flex flex-col items-center justify-center text-xs ${
            pathname.includes("/stats") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <BarChart2 size={20} />
          <span>Stats</span>
        </Link>
        <Link
          href="/review"
          className={`flex flex-col items-center justify-center text-xs ${
            pathname.includes("/review") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Play size={20} />
          <span>OmniReview</span>
        </Link>
        <Link
          href="/search"
          className={`flex flex-col items-center justify-center text-xs ${
            pathname.includes("/search") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Search size={20} />
          <span>Search</span>
        </Link>
        <Link
          href="/account"
          className={`flex flex-col items-center justify-center text-xs ${
            pathname.includes("/account") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <User size={20} />
          <span>Account</span>
        </Link>
      </nav>
    </div>
  )
}
