import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent-solid text-accent-solid-foreground",
        accent: "border-accent-border bg-accent-subtle text-accent-text",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border text-foreground",
        success: "border-status-success-border bg-status-success-bg text-status-success-text",
        warning: "border-status-warning-border bg-status-warning-bg text-status-warning-text",
        error: "border-status-error-border bg-status-error-bg text-status-error-text",
        info: "border-status-info-border bg-status-info-bg text-status-info-text",
        neutral: "border-status-neutral-border bg-status-neutral-bg text-status-neutral-text",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

export function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot ? <span className="size-1.5 rounded-full bg-current opacity-70" aria-hidden /> : null}
      {children}
    </span>
  )
}
