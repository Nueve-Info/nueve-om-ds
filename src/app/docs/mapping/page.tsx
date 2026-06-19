"use client"

import { ArrowRightLeft, Wrench, Palette, Sparkles } from "lucide-react"
import { DocHeader, H2, P, UL, Callout } from "@/components/site/doc"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

type Status = "token" | "patched" | "new" | "direct"

const STATUS_META: Record<Status, { label: string; icon: React.ReactNode; cls: string }> = {
  token: {
    label: "Token",
    icon: <Palette className="size-3.5" />,
    cls: "border-status-info-border bg-status-info-bg text-status-info-text",
  },
  patched: {
    label: "Patched",
    icon: <Wrench className="size-3.5" />,
    cls: "border-status-warning-border bg-status-warning-bg text-status-warning-text",
  },
  new: {
    label: "New",
    icon: <Sparkles className="size-3.5" />,
    cls: "border-accent-border bg-accent-subtle text-accent-text",
  },
  direct: {
    label: "Direct",
    icon: <ArrowRightLeft className="size-3.5" />,
    cls: "border-status-success-border bg-status-success-bg text-status-success-text",
  },
}

const ROWS: { piece: string; status: Status; note: string }[] = [
  { piece: "Accent Color", status: "token", note: "The switchable accent ramp — six CSS variables, no component files." },
  { piece: "Theming & Tokens", status: "token", note: "Surface, border and status tokens layered into the existing @theme block." },
  { piece: "Colors", status: "token", note: "The full palette reference — values only, nothing executable." },
  { piece: "Table edges (first:pl-0)", status: "token", note: "Utility-only tweak so the leading cell sits flush with the gutter." },
  { piece: "Button", status: "patched", note: "Variant table repointed onto the accent ramp; control heights drop one step." },
  { piece: "Checkbox", status: "patched", note: "Checked state moves off indigo onto accent-solid." },
  { piece: "Radio", status: "patched", note: "Selected dot recoloured to the accent ramp." },
  { piece: "Switch", status: "patched", note: "On state recoloured to accent-solid." },
  { piece: "Tabs", status: "patched", note: "Active underline + label follow the accent; count chips restyled." },
  { piece: "App Shell", status: "patched", note: "Sidebar nav active row/text repointed onto accent-subtle / accent-text." },
  { piece: "Page Header", status: "patched", note: "Title row, back-link and action slot restyled to match the accent." },
  { piece: "Data Table", status: "patched", note: "Header, row hover and edges restyled; leading cell loses its pad." },
  { piece: "Filter Bar", status: "patched", note: "Control sizing and active-filter chips brought onto the new tokens." },
  { piece: "Global Search", status: "patched", note: "Command palette trigger and results restyled to the accent." },
  { piece: 'Sidebar "OTHER" section', status: "new", note: "A grouped nav section with no stock-OM equivalent." },
  { piece: "Developer Workbench", status: "new", note: "Stripe-style bottom panel for nerd pages — entirely net-new." },
  { piece: "Badge / StatusBadge", status: "direct", note: "Ships with OM; the restyle uses it as-is." },
  { piece: "Separator", status: "direct", note: "Stock OM primitive, no changes." },
  { piece: "Input", status: "direct", note: "Mostly stock — inherits token colours, no structural patch." },
]

function StatusPill({ status }: { status: Status }) {
  const meta = STATUS_META[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium ${meta.cls}`}>
      {meta.icon}
      {meta.label}
    </span>
  )
}

export default function MappingPage() {
  return (
    <article>
      <DocHeader
        title="How it maps to OM"
        lead="Which pieces ship with OM, which are patched, which are pure tokens, and which are brand new."
      />

      <P>
        Every page in these docs carries a <strong>How it maps to OM</strong> block, because the restyle
        is deliberately not a fork. Most of it is additive or surgical — a handful of new tokens, a few
        patched variant tables, two genuinely new pieces. This page is the index: it sorts every
        documented piece into one of four states so you know exactly what you are taking on.
      </P>

      <UL>
        <li>
          <strong>Token</strong> — a CSS-only change. New custom properties or a utility tweak in{" "}
          <code>globals.css</code>; no component file is touched. The safest kind of change and the
          foundation everything else resolves against.
        </li>
        <li>
          <strong>Patched</strong> — restyles a stock OM component. The component already ships with OM;
          the restyle edits its class strings (usually to repoint colours from <code>bg-primary</code> /{" "}
          <code>accent-indigo</code> onto the accent ramp) via a patch file.
        </li>
        <li>
          <strong>New</strong> — no stock-OM equivalent. Brand-new UI the restyle introduces; you copy it
          in rather than patch anything.
        </li>
        <li>
          <strong>Direct</strong> — ships with OM and is used as-is. We document it for completeness, but
          there is nothing to patch — it already looks right against the new tokens.
        </li>
      </UL>

      <H2>Every piece, by status</H2>
      <P>
        The complete inventory. Tokens come first because the patched components depend on them; the two
        new pieces and the stock primitives round it out.
      </P>
      <div className="my-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left">
            <tr className="border-b border-border">
              <th className="px-4 py-2.5 font-medium text-foreground">Piece</th>
              <th className="px-4 py-2.5 font-medium text-foreground">Status</th>
              <th className="px-4 py-2.5 font-medium text-foreground">What it means</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.piece} className="border-b border-border last:border-0 align-top">
                <td className="px-4 py-2.5 font-medium text-foreground">{r.piece}</td>
                <td className="px-4 py-2.5">
                  <StatusPill status={r.status} />
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout variant="note" title="The one route-specific part">
        Almost everything here is portable as-is. The exception is the sidebar section CSS: it is keyed
        to specific nav <code>href</code>s, so each team must adapt the selectors to their own routes
        before the grouping renders. See{" "}
        <a href="/docs/patterns/sidebar-sections">Sidebar sections</a> for the pattern and the
        find-and-replace you need to do.
      </Callout>

      <OmMapping status="direct" files={["OPEN-MERCATO-UI-STYLING.md"]}>
        <p>
          This page is the human-readable summary. The full, machine-readable changelog — every patched
          file, every token added, every selector — lives in <code>OPEN-MERCATO-UI-STYLING.md</code> in
          the app repo. When a piece here and the changelog disagree, the changelog wins: it is generated
          alongside the patches, so it is the source of truth for what actually ships.
        </p>
      </OmMapping>

      <DocsPager href="/docs/mapping" />
    </article>
  )
}
