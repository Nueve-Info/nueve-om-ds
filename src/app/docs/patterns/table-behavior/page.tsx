"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { DocHeader, H2, H3, P, UL, Callout } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

const CLIENTS = ["Dress Me", "Foxy", "Aucer", "MOSiR Kraków", "Klub Orły", "EVENTUM", "Bractwo Piwne", "Szkoła RYTM"]
const STATUSES: [string, string][] = [
  ["Open", "text-status-info-text"],
  ["In production", "text-status-warning-text"],
  ["Shipped", "text-status-success-text"],
]

/** Self-contained demo: a fixed-height scroll box with a table + a sticky footer.
 *  Scroll INSIDE the box — the footer floats at the box bottom, then rests at the
 *  table's end. Prev/Next are live. This is the OM DataTable footer in miniature. */
function StickyTableDemo() {
  const pageSize = 16
  const total = 412
  const totalPages = Math.ceil(total / pageSize)
  const [page, setPage] = React.useState(1)
  const start = (page - 1) * pageSize
  const rows = Array.from({ length: Math.min(pageSize, total - start) }, (_, i) => {
    const n = start + i
    return {
      id: `S${1000 + n}_06_2026`,
      client: CLIENTS[n % CLIENTS.length],
      status: STATUSES[n % STATUSES.length],
      amount: `${((n * 137) % 9000) + 480} zł`,
    }
  })
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card">
      {/* Full-width scroll container. Both the header and the footer are sticky to its edges,
          and the footer spans the entire width — mirroring the edge-to-edge app table. */}
      <div className="max-h-80 overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 [&_th]:bg-card [&_tr]:border-b [&_tr]:border-border">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-muted-foreground">Order</th>
              <th className="px-4 py-2 text-left font-medium text-muted-foreground">Client</th>
              <th className="px-4 py-2 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-2 text-right font-medium text-muted-foreground">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 transition-colors hover:bg-muted/40">
                <td className="px-4 py-2 font-medium tabular-nums">{r.id}</td>
                <td className="px-4 py-2">{r.client}</td>
                <td className={`px-4 py-2 ${r.status[1]}`}>{r.status[0]}</td>
                <td className="px-4 py-2 text-right tabular-nums">{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* The sticky footer — info left, Prev/Next right. */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between gap-4 border-t border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
          <span className="tabular-nums">
            Showing {start + 1}&ndash;{start + rows.length} of {total}
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TableBehaviorPage() {
  return (
    <article>
      <DocHeader
        badge="New"
        title="Table Behavior"
        lead="How every list table behaves at runtime — a footer that sticks to the bottom of the scroll, and Stripe-style Prev/Next paging instead of a numeric pager."
      />

      <P>
        The styling of the grid lives in <a href="/docs/patterns/data-table">Data Table</a>. This page is
        about how a table <em>behaves</em> when there&apos;s more data than fits: the pagination footer
        stays pinned to the bottom of the viewport as you scroll, and it pages with a simple Previous /
        Next pair. Scroll inside the demo below to feel it.
      </P>

      <Callout variant="note" title="Try it">
        The box below is its own scroll container. Scroll it — the footer floats at the bottom edge while
        rows pass behind it, then settles under the last row when you reach the end. Previous / Next are live.
      </Callout>

      <ComponentPreview
        previewClassName="items-start p-6"
        code={`<div className="rounded-lg border bg-card">
  {/* the scroll container */}
  <div className="max-h-80 overflow-auto">
    <table className="w-full text-sm">
      <thead className="sticky top-0 z-10 [&_th]:bg-card">…</thead>
      <tbody>{rows}</tbody>
    </table>

    {/* sticky footer — info left, Prev/Next right */}
    <div className="sticky bottom-0 z-20 flex items-center justify-between
                    border-t bg-card px-4 py-2.5 text-sm text-muted-foreground">
      <span>Showing {start}–{end} of {total}</span>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={page === 1}>Previous</Button>
        <Button variant="outline" size="sm" disabled={page === totalPages}>Next</Button>
      </div>
    </div>
  </div>
</div>`}
      >
        <StickyTableDemo />
      </ComponentPreview>

      <H2>Sticky footer</H2>
      <P>
        The footer is <code>position: sticky; bottom: 0</code> as the last child of the table&apos;s scroll
        container. While the table runs past the fold it pins to the bottom edge and the rows scroll behind
        it; the moment the bottom of the table comes into view it unsticks and rests under the last row.
        It&apos;s one rule, no JavaScript and no scroll listeners — the browser does it.
      </P>
      <UL>
        <li>
          <strong>Full-width &amp; flat</strong> — the bar spans the entire table width and is a flat strip:{" "}
          <code>border-t</code> on top, no rounding and no bottom border, so it reads as part of the table
          and sits flush against whatever&apos;s below (the page bottom, or the dev workbench) with no gap.
        </li>
        <li>
          <strong>What sticks to what</strong> — sticky is relative to the nearest scrolling ancestor. In
          the OM shell that&apos;s the scrolling <code>&lt;main&gt;</code>; in this demo it&apos;s the{" "}
          <code>max-h-80 overflow-auto</code> box. Either way the footer must live <em>inside</em> that
          scroller, as its last child.
        </li>
        <li>
          <strong>Opaque background</strong> — give the bar <code>bg-card</code> (or{" "}
          <code>bg-background</code>) so rows don&apos;t bleed through while it floats, plus a{" "}
          <code>border-t</code> to read as a divider.
        </li>
        <li>
          <strong>Pairs with a sticky header</strong> — the same trick on{" "}
          <code>&lt;thead className=&quot;sticky top-0&quot;&gt;</code> keeps column labels in view. Column
          headers need their own background (<code>[&amp;_th]:bg-card</code>).
        </li>
      </UL>

      <H2>Pagination — Previous / Next, not numbers</H2>
      <P>
        The footer pages with a single <strong>Previous / Next</strong> pair on the right and a{" "}
        <strong>&quot;Showing 1&ndash;50 of 959&quot;</strong> count on the left — the Stripe pattern. We
        dropped the numeric <code>&lt; 1 2 3 4 5 &gt;</code> pager: with server-side paging over large,
        shifting datasets the page numbers are mostly noise, and the row-count already tells you where you
        are. Buttons disable at the ends (<code>page &le; 1</code>, <code>page &ge; totalPages</code>).
      </P>
      <ComponentPreview
        code={`<div className="flex items-center justify-between border-t bg-card px-4 py-2.5
                text-sm text-muted-foreground">
  <span className="tabular-nums">Showing 1–50 of 959</span>
  <div className="flex gap-2">
    <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs" disabled>Previous</Button>
    <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">Next</Button>
  </div>
</div>`}
      >
        <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
          <span className="tabular-nums">Showing 1&ndash;50 of 959</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">
              Next
            </Button>
          </div>
        </div>
      </ComponentPreview>

      <H3>Report tables without paging</H3>
      <P>
        A computed read-model (no server paging) uses the same sticky bar to carry a per-view summary
        instead of buttons — e.g. the Zlecenia screen&apos;s <code>Fakturowanie</code> tab shows{" "}
        <code>11 orders · 3 lines · 6588 zł</code> there. Same bar, different right-hand payload. See{" "}
        <a href="/docs/patterns/page-header">Page Header</a>.
      </P>

      <OmMapping
        status="patched"
        files={["@open-mercato/ui/backend/DataTable.js", "@open-mercato/ui/primitives/pagination.js"]}
      >
        <p>
          This is patched into <code>DataTable</code> so <strong>every list in the app inherits it</strong>{" "}
          — Orders, Companies, Planning, Product kinds, all of them. The footer the table renders below the
          grid is the sticky <code>Previous / Next</code> bar; the numeric <code>Pagination</code> primitive
          is no longer used by the grid (it&apos;s still exported for one-off lists).
        </p>
        <CodeBlock
          language="tsx"
          code={`// DataTable's pagination footer (patched) — flat bar, border-t only
<div className="om-sticky-table-footer sticky bottom-0 z-10 flex items-center
                justify-between border-t bg-card px-4 py-2.5">
  <span className="text-sm text-muted-foreground tabular-nums">
    {t('…pagination.results', 'Showing {start} to {end} of {total} results', …)}
  </span>
  <div className="flex gap-2">
    {/* compact buttons — h-7 text-xs, smaller than the default control row */}
    <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs"
            disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Previous</Button>
    <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs"
            disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Next</Button>
  </div>
</div>`}
        />
        <p>
          The bar is a flat strip — <code>border-t</code> on top, no rounding or bottom border — so it sits
          flush against whatever&apos;s below. It clears the fixed Developer Workbench strip for free
          because the workbench reserves its own height on the scroll container
          (<code>body.has-workbench main {"{ padding-bottom: 2.5rem }"}</code>), so a plain{" "}
          <code>bottom-0</code> sticky rests right on top of it. <code>om-sticky-table-footer</code> stays
          on the bar as a stable hook for any future workbench-aware tweak.
        </p>
      </OmMapping>

      <DocsPager href="/docs/patterns/table-behavior" />
    </article>
  )
}
