"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { DocsSidebar } from "./sidebar"

/** Hamburger (shown < md) that opens the docs nav as a slide-in drawer. */
export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  // Close on route change.
  React.useEffect(() => setOpen(false), [pathname])

  // Lock body scroll while open.
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        className="inline-flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
      >
        <Menu className="size-4" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-72 max-w-[82%] flex-col overflow-y-auto border-r border-border bg-background px-4 pb-6">
            <div className="sticky top-0 flex h-14 items-center justify-between bg-background">
              <span className="font-semibold tracking-tight text-foreground">Documentation</span>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <DocsSidebar />
          </div>
        </div>
      ) : null}
    </>
  )
}
