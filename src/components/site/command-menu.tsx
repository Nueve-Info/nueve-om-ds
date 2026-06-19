"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { nav } from "@/lib/registry"
import { cn } from "@/lib/utils"

type Ctx = { open: boolean; setOpen: (v: boolean) => void }
const CommandCtx = React.createContext<Ctx | null>(null)

export function useCommandMenu() {
  const c = React.useContext(CommandCtx)
  if (!c) throw new Error("useCommandMenu must be used within CommandMenuProvider")
  return c
}

/** Wrap the app once. Owns the ⌘K listener and renders the dialog. */
export function CommandMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])
  return (
    <CommandCtx.Provider value={{ open, setOpen }}>
      {children}
      <CommandDialog open={open} setOpen={setOpen} />
    </CommandCtx.Provider>
  )
}

/** A search affordance that opens the command menu. `bar` = input-styled with ⌘K; `icon` = compact. */
export function CommandTrigger({ variant = "bar", className }: { variant?: "bar" | "icon"; className?: string }) {
  const { setOpen } = useCommandMenu()
  if (variant === "icon") {
    return (
      <button
        type="button"
        aria-label="Search documentation"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex size-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          className,
        )}
      >
        <Search className="size-4" />
      </button>
    )
  }
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "flex w-full items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted",
        className,
      )}
    >
      <Search className="size-4 shrink-0" />
      <span className="flex-1 text-left">Search documentation…</span>
      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
        ⌘K
      </kbd>
    </button>
  )
}

function CommandDialog({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const groups = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return nav
      .map((g) => ({
        title: g.title,
        items: g.items.filter(
          (it) => !q || it.title.toLowerCase().includes(q) || g.title.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.items.length > 0)
  }, [query])
  const flat = React.useMemo(() => groups.flatMap((g) => g.items), [groups])

  React.useEffect(() => {
    if (open) {
      setQuery("")
      setActive(0)
      const t = setTimeout(() => inputRef.current?.focus(), 0)
      return () => clearTimeout(t)
    }
  }, [open])
  React.useEffect(() => setActive(0), [query])

  if (!open) return null

  const go = (href: string) => {
    setOpen(false)
    router.push(href)
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, flat.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const it = flat[active]
      if (it) go(it.href)
    } else if (e.key === "Escape") {
      e.preventDefault()
      setOpen(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[12vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-popover shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search documentation…"
            className="h-11 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="pointer-events-none hidden h-5 select-none items-center rounded border border-border bg-background px-1.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
            Esc
          </kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {flat.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">No results found.</div>
          ) : (
            groups.map((g) => (
              <div key={g.title} className="mb-2 last:mb-0">
                <div className="px-2 py-1 text-overline font-medium uppercase tracking-wider text-muted-foreground/70">
                  {g.title}
                </div>
                {g.items.map((it) => {
                  const idx = flat.indexOf(it)
                  const isActive = idx === active
                  return (
                    <button
                      key={it.href}
                      type="button"
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => go(it.href)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                        isActive ? "bg-accent-subtle text-accent-text" : "text-foreground",
                      )}
                    >
                      <span className="flex-1 truncate">{it.title}</span>
                      {it.badge ? (
                        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                          {it.badge}
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
