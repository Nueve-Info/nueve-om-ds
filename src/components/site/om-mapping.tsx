import * as React from "react"
import { ArrowRightLeft, Sparkles, Wrench, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

type MapStatus = "direct" | "patched" | "token" | "new"

const META: Record<MapStatus, { label: string; icon: React.ReactNode; cls: string }> = {
  direct: {
    label: "Direct — ships with OM",
    icon: <ArrowRightLeft className="size-3.5" />,
    cls: "border-status-success-border bg-status-success-bg text-status-success-text",
  },
  patched: {
    label: "Patched — restyles a stock component",
    icon: <Wrench className="size-3.5" />,
    cls: "border-status-warning-border bg-status-warning-bg text-status-warning-text",
  },
  token: {
    label: "Token — CSS-only change",
    icon: <Palette className="size-3.5" />,
    cls: "border-status-info-border bg-status-info-bg text-status-info-text",
  },
  new: {
    label: "New — no stock-OM equivalent",
    icon: <Sparkles className="size-3.5" />,
    cls: "border-accent-border bg-accent-subtle text-accent-text",
  },
}

/**
 * The signature "How it maps to OM" block. Every component page carries one:
 * it says whether the component ships with OM as-is, is patched by the restyle,
 * is a pure token change, or is brand new — and how to wire it on a real OM app.
 */
export function OmMapping({
  status,
  files,
  children,
}: {
  status: MapStatus
  /** Source files / patches this maps to, shown as monospace chips. */
  files?: string[]
  children: React.ReactNode
}) {
  const meta = META[status]
  return (
    <section className="my-8 overflow-hidden rounded-xl border border-border bg-muted/30">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-card px-5 py-3">
        <span className="text-sm font-semibold text-foreground">How it maps to OM</span>
        <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium", meta.cls)}>
          {meta.icon}
          {meta.label}
        </span>
      </div>
      <div className="space-y-4 px-5 py-5 text-sm leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground [&_a]:text-accent-text [&_a:hover]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-foreground">
        {children}
        {files && files.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">Touches</span>
            {files.map((f) => (
              <code key={f} className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs text-foreground">
                {f}
              </code>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
