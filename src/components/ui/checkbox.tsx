"use client"

import * as React from "react"
import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps {
  checked?: boolean | "indeterminate"
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
  className?: string
  "aria-label"?: string
}

/** OM restyle Checkbox — selection state uses the accent-solid ramp (was accent-indigo). */
export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  className,
  ...props
}: CheckboxProps) {
  const [internal, setInternal] = React.useState(defaultChecked)
  const isControlled = checked !== undefined
  const state = isControlled ? checked : internal
  const isOn = state === true || state === "indeterminate"

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={state === "indeterminate" ? "mixed" : !!state}
      disabled={disabled}
      data-state={state === "indeterminate" ? "indeterminate" : state ? "checked" : "unchecked"}
      onClick={() => {
        if (disabled) return
        const next = !isOn
        if (!isControlled) setInternal(next)
        onCheckedChange?.(next)
      }}
      className={cn(
        "peer inline-flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input bg-background shadow-xs transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-solid/40 focus-visible:ring-offset-2",
        "hover:border-accent-solid/60",
        "data-[state=checked]:bg-accent-solid data-[state=checked]:text-accent-solid-foreground data-[state=checked]:border-accent-solid",
        "data-[state=indeterminate]:bg-accent-solid data-[state=indeterminate]:text-accent-solid-foreground data-[state=indeterminate]:border-accent-solid",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {state === "indeterminate" ? (
        <Minus className="size-3" strokeWidth={3} />
      ) : state ? (
        <Check className="size-3" strokeWidth={3} />
      ) : null}
    </button>
  )
}
