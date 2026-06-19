import Link from "next/link"
import { Layers } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { AccentSwitcher } from "./accent-switcher"
import { CommandTrigger } from "./command-menu"
import { MobileNav } from "./mobile-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <MobileNav />
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
          <span className="flex size-7 items-center justify-center rounded-md bg-accent-solid text-accent-solid-foreground">
            <Layers className="size-4" />
          </span>
          <span className="hidden sm:inline">OM Design System</span>
        </Link>
        <nav className="ml-2 hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
          <Link href="/docs" className="transition-colors hover:text-foreground">
            Docs
          </Link>
          <Link href="/docs/components/button" className="transition-colors hover:text-foreground">
            Components
          </Link>
          <Link href="/docs/installation" className="transition-colors hover:text-foreground">
            Installation
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <CommandTrigger variant="bar" className="hidden w-52 md:flex lg:w-64" />
          <CommandTrigger variant="icon" className="md:hidden" />
          <div className="hidden items-center gap-2 sm:flex">
            <span className="hidden text-xs text-muted-foreground lg:inline">Accent</span>
            <AccentSwitcher />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
