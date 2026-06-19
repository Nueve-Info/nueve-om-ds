"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type TabsContext = { value: string; setValue: (v: string) => void }
const Ctx = React.createContext<TabsContext | null>(null)

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
}: {
  value?: string
  defaultValue?: string
  onValueChange?: (v: string) => void
  className?: string
  children: React.ReactNode
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? "")
  const isControlled = value !== undefined
  const current = isControlled ? value : internal
  const setValue = (v: string) => {
    if (!isControlled) setInternal(v)
    onValueChange?.(v)
  }
  return (
    <Ctx.Provider value={{ value: current, setValue }}>
      <div className={className}>{children}</div>
    </Ctx.Provider>
  )
}

export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div role="tablist" className={cn("flex items-center gap-4 border-b border-border", className)}>
      {children}
    </div>
  )
}

/** OM restyle Tab — selected underline + label use the accent ramp (was accent-indigo). */
export function TabsTrigger({
  value,
  count,
  leading,
  className,
  children,
}: {
  value: string
  count?: number
  leading?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs")
  const isSelected = ctx.value === value
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      onClick={() => ctx.setValue(value)}
      className={cn(
        "group relative -mb-px inline-flex items-center gap-2 border-b-2 border-transparent px-1 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors",
        "hover:text-foreground focus-visible:shadow-focus",
        isSelected ? "border-accent-solid font-semibold text-accent-text" : "",
        className,
      )}
    >
      {leading ? (
        <span className={cn("inline-flex shrink-0 items-center justify-center", isSelected ? "text-accent-solid" : "text-muted-foreground")}>
          {leading}
        </span>
      ) : null}
      {children}
      {typeof count === "number" ? (
        <span
          className={cn(
            "inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-xs font-medium",
            isSelected ? "bg-accent-solid/10 text-accent-solid" : "bg-muted text-muted-foreground",
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  )
}

export function TabsContent({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error("TabsContent must be used within Tabs")
  if (ctx.value !== value) return null
  return <div className={cn("pt-4", className)}>{children}</div>
}
