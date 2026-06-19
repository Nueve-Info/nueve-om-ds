"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export const ACCENTS = [
  { id: "blue", label: "Blue", swatch: "oklch(0.546 0.245 262.881)" },
  { id: "green", label: "Green", swatch: "oklch(0.596 0.145 163.225)" },
  { id: "red", label: "Red", swatch: "oklch(0.592 0.249 0.584)" },
  { id: "orange", label: "Orange", swatch: "oklch(0.646 0.222 41.116)" },
  { id: "purple", label: "Purple", swatch: "oklch(0.558 0.288 302.321)" },
] as const

export type AccentId = (typeof ACCENTS)[number]["id"]

function applyAccent(id: AccentId) {
  const root = document.documentElement
  if (id === "blue") root.removeAttribute("data-accent")
  else root.setAttribute("data-accent", id)
  try {
    localStorage.setItem("ds-accent", id)
  } catch {}
}

/** Live accent picker — sets `data-accent` on <html>, recolouring the whole site. */
export function AccentSwitcher({ size = "sm" }: { size?: "sm" | "lg" }) {
  const [active, setActive] = React.useState<AccentId>("blue")

  React.useEffect(() => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem("ds-accent")
    } catch {}
    if (saved && ACCENTS.some((a) => a.id === saved)) {
      setActive(saved as AccentId)
      applyAccent(saved as AccentId)
    }
  }, [])

  return (
    <div className="flex items-center gap-1.5">
      {ACCENTS.map((a) => {
        const isActive = active === a.id
        return (
          <button
            key={a.id}
            type="button"
            title={a.label}
            aria-label={`Accent ${a.label}`}
            aria-pressed={isActive}
            onClick={() => {
              setActive(a.id)
              applyAccent(a.id)
            }}
            className={cn(
              "rounded-full ring-offset-2 ring-offset-background transition-all",
              size === "lg" ? "size-7" : "size-5",
              isActive ? "ring-2 ring-foreground" : "ring-1 ring-border hover:ring-foreground/40",
            )}
            style={{ backgroundColor: a.swatch }}
          />
        )
      })}
    </div>
  )
}
