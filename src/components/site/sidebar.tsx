"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { nav, type NavGroup } from "@/lib/registry"
import { cn } from "@/lib/utils"

export function DocsSidebar() {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1 py-6 pr-4 text-sm">
      {nav.map((group) => (
        <SidebarGroup key={group.title} group={group} pathname={pathname} />
      ))}
    </nav>
  )
}

function SidebarGroup({ group, pathname }: { group: NavGroup; pathname: string }) {
  const storageKey = `ds-nav:${group.title}`
  const [open, setOpen] = React.useState(true)

  // Restore the collapsed state after mount (SSR-safe: first paint is expanded).
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved === "0") setOpen(false)
    } catch {}
  }, [storageKey])

  const toggle = () => {
    setOpen((o) => {
      const next = !o
      try {
        localStorage.setItem(storageKey, next ? "1" : "0")
      } catch {}
      return next
    })
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex items-center justify-between rounded-md px-2 py-1.5 text-overline font-medium uppercase tracking-wider text-muted-foreground/70 transition-colors hover:text-foreground"
      >
        <span>{group.title}</span>
        <ChevronRight className={cn("size-3.5 shrink-0 transition-transform duration-200", open && "rotate-90")} />
      </button>

      {/* grid-rows 0fr→1fr animates the height while items stay mounted */}
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="mt-0.5 flex flex-col gap-0.5 pb-1">
            {group.items.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-md px-2 py-1.5 font-medium transition-colors",
                    active
                      ? "bg-accent-subtle text-accent-text"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span>{item.title}</span>
                  {item.badge ? (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                        item.badge === "New"
                          ? "bg-accent-solid/10 text-accent-text"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
