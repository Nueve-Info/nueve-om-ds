"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type RadioGroupContext = {
  value?: string
  setValue: (v: string) => void
  name: string
}
const Ctx = React.createContext<RadioGroupContext | null>(null)

export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  name = "radio",
  className,
  children,
}: {
  value?: string
  defaultValue?: string
  onValueChange?: (v: string) => void
  name?: string
  className?: string
  children: React.ReactNode
}) {
  const [internal, setInternal] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal
  const setValue = (v: string) => {
    if (!isControlled) setInternal(v)
    onValueChange?.(v)
  }
  return (
    <Ctx.Provider value={{ value: current, setValue, name }}>
      <div role="radiogroup" className={cn("flex flex-col gap-2", className)}>
        {children}
      </div>
    </Ctx.Provider>
  )
}

/** OM restyle Radio — checked state uses the accent-solid ramp (was accent-indigo). */
export function Radio({ value, disabled, className }: { value: string; disabled?: boolean; className?: string }) {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error("Radio must be used within RadioGroup")
  const checked = ctx.value === value
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      data-state={checked ? "checked" : "unchecked"}
      onClick={() => !disabled && ctx.setValue(value)}
      className={cn(
        "flex aspect-square size-5 shrink-0 items-center justify-center rounded-full border border-input bg-background transition-colors",
        "hover:border-muted-foreground/40",
        "data-[state=checked]:border-accent-solid data-[state=checked]:bg-accent-solid",
        "focus-visible:outline-none focus-visible:shadow-focus",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {checked ? <span className="size-2 rounded-full bg-accent-solid-foreground" /> : null}
    </button>
  )
}
