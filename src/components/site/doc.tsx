import * as React from "react"
import { cn } from "@/lib/utils"

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

/** Page title + lead paragraph, shadcn-style. */
export function DocHeader({ title, lead, badge }: { title: string; lead?: string; badge?: string }) {
  return (
    <div className="mb-8 space-y-3">
      {badge ? (
        <span className="inline-flex items-center rounded-full border border-accent-border bg-accent-subtle px-2.5 py-0.5 text-xs font-medium text-accent-text">
          {badge}
        </span>
      ) : null}
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
      {lead ? <p className="text-lg text-muted-foreground">{lead}</p> : null}
    </div>
  )
}

export function H2({ children }: { children: string }) {
  const id = slugify(children)
  return (
    <h2 id={id} className="group mt-12 mb-4 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight text-foreground">
      <a href={`#${id}`} className="no-underline">
        {children}
      </a>
    </h2>
  )
}

export function H3({ children }: { children: string }) {
  const id = slugify(children)
  return (
    <h3 id={id} className="mt-8 mb-3 scroll-m-20 text-lg font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  )
}

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "leading-7 text-muted-foreground [&:not(:first-child)]:mt-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_a]:text-accent-text [&_a:hover]:underline",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-foreground",
        className,
      )}
    >
      {children}
    </p>
  )
}

export function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-4 ml-6 list-disc space-y-2 text-muted-foreground marker:text-muted-foreground/50 [&_strong]:font-semibold [&_strong]:text-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-foreground">
      {children}
    </ul>
  )
}

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: "info" | "warning" | "note"
  title?: string
  children: React.ReactNode
}) {
  const cls =
    variant === "warning"
      ? "border-status-warning-border bg-status-warning-bg text-status-warning-text"
      : variant === "note"
        ? "border-border bg-muted/40 text-muted-foreground"
        : "border-status-info-border bg-status-info-bg text-status-info-text"
  return (
    <div className={cn("my-6 rounded-lg border px-4 py-3 text-sm leading-relaxed", cls)}>
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div className="[&_code]:rounded [&_code]:bg-black/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] dark:[&_code]:bg-white/10">
        {children}
      </div>
    </div>
  )
}

export type PropRow = { name: string; type: string; default?: string; description: string }

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-left">
          <tr className="border-b border-border">
            <th className="px-4 py-2.5 font-medium text-foreground">Prop</th>
            <th className="px-4 py-2.5 font-medium text-foreground">Type</th>
            <th className="px-4 py-2.5 font-medium text-foreground">Default</th>
            <th className="px-4 py-2.5 font-medium text-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-border last:border-0 align-top">
              <td className="px-4 py-2.5">
                <code className="font-mono text-xs text-accent-text">{r.name}</code>
              </td>
              <td className="px-4 py-2.5">
                <code className="font-mono text-xs text-muted-foreground">{r.type}</code>
              </td>
              <td className="px-4 py-2.5">
                {r.default ? <code className="font-mono text-xs text-muted-foreground">{r.default}</code> : <span className="text-muted-foreground/50">—</span>}
              </td>
              <td className="px-4 py-2.5 text-muted-foreground">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Steps({ children }: { children: React.ReactNode }) {
  return <div className="my-6 ml-4 border-l border-border pl-6 [counter-reset:step]">{children}</div>
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative mb-8 last:mb-0">
      <div className="absolute -left-[33px] flex size-6 items-center justify-center rounded-full border border-border bg-card text-xs font-semibold text-foreground [counter-increment:step] before:content-[counter(step)]" />
      <h4 className="mb-2 font-semibold text-foreground">{title}</h4>
      <div className="text-sm leading-7 text-muted-foreground [&_a]:text-accent-text [&_a:hover]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-foreground">
        {children}
      </div>
    </div>
  )
}
