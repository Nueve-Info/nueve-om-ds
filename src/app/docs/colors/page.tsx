"use client"

import { DocHeader, H2, P, Callout } from "@/components/site/doc"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

const STATUS: { name: string; bg: string; border: string; text: string }[] = [
  { name: "status-error", bg: "bg-status-error-bg", border: "border-status-error-border", text: "text-status-error-text" },
  { name: "status-success", bg: "bg-status-success-bg", border: "border-status-success-border", text: "text-status-success-text" },
  { name: "status-warning", bg: "bg-status-warning-bg", border: "border-status-warning-border", text: "text-status-warning-text" },
  { name: "status-info", bg: "bg-status-info-bg", border: "border-status-info-border", text: "text-status-info-text" },
  { name: "status-neutral", bg: "bg-status-neutral-bg", border: "border-status-neutral-border", text: "text-status-neutral-text" },
]

const BASE: { name: string; cls: string; role: string }[] = [
  { name: "background", cls: "bg-background", role: "Page canvas" },
  { name: "foreground", cls: "bg-foreground", role: "Primary text" },
  { name: "card", cls: "bg-card", role: "Raised surfaces" },
  { name: "muted", cls: "bg-muted", role: "Subtle fills, table headers" },
  { name: "border", cls: "bg-border", role: "Hairlines" },
  { name: "primary", cls: "bg-primary", role: "Near-black anchor (rarely used since accent took over)" },
]

export default function ColorsPage() {
  return (
    <article>
      <DocHeader
        title="Colors"
        lead="Semantic status tokens — never hardcode text-red-500. Plus base surfaces and the accent ramp."
      />

      <P>
        Every colour in the restyle resolves to a token, so the same markup adapts to light and dark
        and reskins when the accent changes. Three families cover almost everything: semantic{" "}
        <strong>status</strong> tints for feedback, neutral <strong>base</strong> surfaces for
        structure, and the switchable <strong>accent</strong> ramp for interaction.
      </P>

      <H2>Status</H2>
      <P>
        Each status has a <code>bg</code> / <code>border</code> / <code>text</code> triple tuned to
        pass contrast in both themes. Reach for these on badges, callouts, toasts and inline
        validation — never a raw Tailwind palette colour.
      </P>
      <div className="my-6 grid gap-3 sm:grid-cols-2">
        {STATUS.map((s) => (
          <div key={s.name} className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${s.bg} ${s.border}`}>
            <span className={`size-5 rounded-full border ${s.border} bg-current opacity-80 ${s.text}`} />
            <code className={`font-mono text-sm font-medium ${s.text}`}>{s.name}</code>
          </div>
        ))}
      </div>
      <CodeBlock
        language="tsx"
        code={`<span className="rounded-md border border-status-error-border bg-status-error-bg px-2 py-0.5 text-status-error-text">
  Payment failed
</span>`}
      />

      <Callout variant="warning" title="Don't hardcode Tailwind colours">
        Never reach for <code>text-red-500</code> or <code>bg-green-100</code> directly. They look
        right in one theme and break in the other, and they won&apos;t follow future palette tweaks.
        Always use the semantic <code>status-*</code> tokens — every one ships with a dark-mode value
        built in.
      </Callout>

      <H2>Base</H2>
      <P>
        The neutral surfaces that build page structure. <code>background</code> and <code>card</code>{" "}
        define the two stacking levels, <code>border</code> draws every hairline, and{" "}
        <code>foreground</code> / <code>muted-foreground</code> carry text.
      </P>
      <div className="my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BASE.map((b) => (
          <div key={b.name} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
            <span className={`size-8 shrink-0 rounded-md border border-border ${b.cls}`} />
            <div className="min-w-0">
              <code className="block font-mono text-sm text-accent-text">{b.name}</code>
              <span className="text-xs text-muted-foreground">{b.role}</span>
            </div>
          </div>
        ))}
      </div>

      <H2>Accent</H2>
      <P>
        The accent ramp is the one switchable family — flip <code>data-accent</code> and every
        interactive surface recolours. The three you reach for most are <code>bg-accent-solid</code>{" "}
        for filled controls, <code>bg-accent-subtle</code> for active-row tints, and{" "}
        <code>text-accent-text</code> for links. See <a href="/docs/accent-color">Accent Color</a> for
        the full six-token ramp and how to define switchable palettes.
      </P>
      <div className="my-6 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center rounded-md bg-accent-solid px-3 py-1.5 text-sm font-medium text-accent-solid-foreground">
          bg-accent-solid
        </span>
        <span className="inline-flex items-center rounded-md bg-accent-subtle px-3 py-1.5 text-sm font-medium text-accent-text">
          bg-accent-subtle
        </span>
        <a href="/docs/accent-color" className="text-sm font-medium text-accent-text underline-offset-4 hover:underline">
          text-accent-text
        </a>
      </div>

      <OmMapping status="direct" files={["src/app/globals.css"]}>
        <p>
          The status tokens ship with OM&apos;s design system — they are defined once in{" "}
          <code>globals.css</code> with both light and dark values, exposed to Tailwind via the{" "}
          <code>@theme inline</code> block. There is nothing to patch: use{" "}
          <code>bg-status-error-bg</code>, <code>text-status-success-text</code> and friends straight
          from your modules. Stay on these tokens and feedback UI stays consistent and theme-correct
          for free.
        </p>
      </OmMapping>

      <DocsPager href="/docs/colors" />
    </article>
  )
}
