"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
  className?: string
  "aria-label"?: string
}

/** OM restyle Switch — checked track uses the accent-solid ramp (was accent-indigo). */
export function Switch({ checked, defaultChecked = false, onCheckedChange, disabled, className, ...props }: SwitchProps) {
  const [internal, setInternal] = React.useState(defaultChecked)
  const isControlled = checked !== undefined
  const state = isControlled ? checked : internal

  return (
    <button
      type="button"
      role="switch"
      aria-checked={state}
      disabled={disabled}
      data-state={state ? "checked" : "unchecked"}
      onClick={() => {
        if (disabled) return
        const next = !state
        if (!isControlled) setInternal(next)
        onCheckedChange?.(next)
      }}
      className={cn(
        "group inline-flex shrink-0 cursor-pointer items-center disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none flex h-4 w-7 items-center rounded-full px-0.5 transition-colors duration-150",
          "bg-border group-hover:bg-muted-foreground/30",
          "group-data-[state=checked]:bg-accent-solid group-data-[state=checked]:group-hover:bg-accent-solid/85",
        )}
      >
        <span
          className={cn(
            "size-3 rounded-full bg-white shadow-sm transition-transform duration-150",
            state ? "translate-x-3" : "translate-x-0",
          )}
        />
      </span>
    </button>
  )
}
