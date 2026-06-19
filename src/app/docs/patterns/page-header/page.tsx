"use client"

import { ArrowLeft, BarChart3, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DocHeader, H2, H3, P, UL, Callout } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

const HERO_ROWS: [string, string, string, string][] = [
  ["S1_06_2026", "Dress Me", "In production", "6 588 zł"],
  ["S2_06_2026", "Foxy", "Open", "2 140 zł"],
  ["S3_06_2026", "Aucer", "Shipped", "980 zł"],
]

/** The full list-page header, assembled: title + actions → tab rail on a full-width
 *  separator → contextual search → table. This is the canonical composition. */
function ListPageHeader() {
  return (
    <div className="w-full space-y-4">
      {/* Title row — name on the left, actions parked on the right. */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1 text-sm text-accent-text hover:underline">
            <ArrowLeft className="size-4" /> Workspace
          </a>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Orders</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus /> New order
          </Button>
          <Button variant="outline">
            <BarChart3 /> Analyze
          </Button>
        </div>
      </div>

      {/* Tab rail — the TabsList border-b is the full-width separator; the active
          trigger's accent underline sits ON it. Labels only, no count badges. */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="prod">In production</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Contextual search — full-width, leading icon. */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search orders…" className="pl-9" />
      </div>

      {/* Table — edge-to-edge, muted header, flush columns. */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {HERO_ROWS.map(([id, client, status, value]) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{id}</TableCell>
              <TableCell>{client}</TableCell>
              <TableCell className="text-muted-foreground">{status}</TableCell>
              <TableCell className="text-right">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default function PageHeaderPage() {
  return (
    <article>
      <DocHeader
        badge="Updated"
        title="Page Header"
        lead="The full anatomy of a list screen — title, actions, a tab rail that sits on a full-width separator, contextual search, and the table below."
      />

      <P>
        Every backend list screen is the same stack: a large page title with its primary action parked
        on the right, an optional tab rail sitting on a full-width separator, a contextual search row,
        and the table. Wire these in the same order every time and screens feel like one product rather
        than a pile of pages. The reference is the Stripe dashboard header — title, tabs on a hairline,
        table — and this is the OM equivalent.
      </P>

      <ComponentPreview
        previewClassName="items-start p-6"
        code={`<div className="space-y-4">
  {/* Title + actions */}
  <div className="flex items-start justify-between gap-4">
    <div className="space-y-1">
      <a className="inline-flex items-center gap-1 text-sm text-accent-text">
        <ArrowLeft className="size-4" /> Workspace
      </a>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Orders</h1>
    </div>
    <div className="flex items-center gap-2">
      <Button><Plus /> New order</Button>
      <Button variant="outline"><BarChart3 /> Analyze</Button>
    </div>
  </div>

  {/* Tab rail on the full-width separator */}
  <Tabs defaultValue="all">
    <TabsList className="w-full">
      <TabsTrigger value="all">All</TabsTrigger>
      <TabsTrigger value="open">Open</TabsTrigger>
      <TabsTrigger value="prod">In production</TabsTrigger>
      <TabsTrigger value="shipped">Shipped</TabsTrigger>
    </TabsList>
  </Tabs>

  {/* Contextual search */}
  <div className="relative">
    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    <Input placeholder="Search orders…" className="pl-9" />
  </div>

  {/* Table */}
  <Table>…</Table>
</div>`}
      >
        <ListPageHeader />
      </ComponentPreview>

      <H2>Anatomy</H2>
      <UL>
        <li>
          <strong>Breadcrumb / back-link</strong> — optional, above the title, on the{" "}
          <code>accent-text</code> ramp.
        </li>
        <li>
          <strong>Title + actions</strong> — one <code>flex items-start justify-between</code> row: the{" "}
          <code>h1</code> on the left, the primary CTA (plus any secondary) on the right.
        </li>
        <li>
          <strong>Tab rail</strong> — optional. The <code>TabsList</code>&apos;s bottom border <em>is</em>{" "}
          the separator; it runs the full content width and the tabs sit on it.
        </li>
        <li>
          <strong>Search</strong> — optional, full-width contextual search directly under the rail.
        </li>
        <li>
          <strong>Table</strong> — edge-to-edge, no card frame, muted header row.
        </li>
      </UL>

      <H2>Typography</H2>
      <P>
        The title is the anchor — it moved up one step in the restyle, from{" "}
        <code>text-xl sm:text-2xl</code> to <code>text-2xl sm:text-3xl</code>, and picked up{" "}
        <code>tracking-tight</code>. Everything else in the header is secondary type so the page name
        wins the first glance.
      </P>
      <UL>
        <li>
          <strong>Title</strong> — <code>text-2xl font-semibold tracking-tight sm:text-3xl</code>.
        </li>
        <li>
          <strong>Description</strong> — <code>text-sm text-muted-foreground</code>, one line under the
          title (omit it when you have a tab rail — don&apos;t stack both).
        </li>
        <li>
          <strong>Back-link / breadcrumb</strong> — <code>text-sm text-accent-text</code>, with a{" "}
          <code>size-4</code> leading arrow.
        </li>
      </UL>
      <CodeBlock
        language="tsx"
        code={`<a className="inline-flex items-center gap-1 text-sm text-accent-text hover:underline">
  <ArrowLeft className="size-4" /> Workspace
</a>
<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Orders</h1>`}
      />

      <H2>Primary action (CTA)</H2>
      <P>
        Actions live on the right of the title row, never below it. Lead with one{" "}
        <strong>primary accent button</strong> — the one thing you want done on this screen — and keep
        any secondary action in an <code>outline</code> or <code>ghost</code> variant so the hierarchy
        stays obvious. Buttons take a leading <code>lucide</code> icon at <code>size-4</code>.
      </P>
      <ComponentPreview
        code={`<div className="flex items-center gap-2">
  <Button><Plus /> New order</Button>                       {/* primary — accent */}
  <Button variant="outline"><BarChart3 /> Analyze</Button>  {/* secondary */}
</div>`}
      >
        <div className="flex items-center gap-2">
          <Button>
            <Plus /> New order
          </Button>
          <Button variant="outline">
            <BarChart3 /> Analyze
          </Button>
        </div>
      </ComponentPreview>

      <H2>Separator &amp; tabs</H2>
      <P>
        This is the detail people get wrong. The separator is <strong>not</strong> a line you draw under
        the header — it is the <code>TabsList</code>&apos;s own <code>border-b</code>, and it spans the
        full content width. Each tab then pulls its own bottom border down onto that line with{" "}
        <code>-mb-px</code>, so the active tab&apos;s <code>border-b-2 border-accent-solid</code> underline
        sits <em>on</em> the rail instead of below it. That overlap is what makes the tabs read as sitting
        on the separator, exactly like Stripe.
      </P>
      <ComponentPreview
        previewClassName="items-start p-6"
        code={`{/* TabsList = the full-width separator rail (flex + border-b) */}
<TabsList className="w-full">
  <TabsTrigger value="payments">Payments</TabsTrigger>
  <TabsTrigger value="payouts">Payouts</TabsTrigger>
  <TabsTrigger value="topups">Top-ups</TabsTrigger>
  <TabsTrigger value="all">All activity</TabsTrigger>
</TabsList>`}
      >
        <div className="w-full">
          <Tabs defaultValue="payments">
            <TabsList>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
              <TabsTrigger value="topups">Top-ups</TabsTrigger>
              <TabsTrigger value="all">All activity</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </ComponentPreview>
      <P>The trigger classes that put the tab on the line, not below it:</P>
      <CodeBlock
        language="tsx"
        code={`// TabsTrigger (underline variant)
"-mb-px border-b-2 border-transparent px-1 py-2 …"   // -mb-px → border lands on the rail
isSelected && "border-accent-solid text-accent-text" // active accent underline + label`}
      />
      <Callout variant="note" title="Full-width rail">
        On OM&apos;s <code>Tabs</code> the underline <code>TabsList</code> is <code>inline-flex</code> by
        default, so its border only spans the tabs. Add <code>className=&quot;w-full&quot;</code> to stretch
        the rail across the whole content width — this is what makes the separator read as a page divider
        rather than a stub under the labels.
      </Callout>

      <H3>Counts are optional</H3>
      <P>
        A tab can carry a <code>count</code> badge, but reach for it only when the number actually helps
        someone scan — an inbox, a queue. For a small, fixed set of views the <strong>label alone is
        cleaner</strong>; a row of badges on every tab just adds noise.
      </P>
      <ComponentPreview
        code={`{/* Labels only — preferred for a small, fixed set */}
<TabsTrigger value="invoicing">Invoicing</TabsTrigger>

{/* With counts — only when the number aids scanning */}
<TabsTrigger value="inbox" count={12}>Inbox</TabsTrigger>`}
      >
        <div className="flex flex-col gap-6">
          <Tabs defaultValue="a">
            <TabsList>
              <TabsTrigger value="a">Invoicing</TabsTrigger>
              <TabsTrigger value="b">Packing</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue="c">
            <TabsList>
              <TabsTrigger value="c" count={12}>
                Inbox
              </TabsTrigger>
              <TabsTrigger value="d" count={3}>
                Flagged
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </ComponentPreview>

      <H2>Search</H2>
      <P>
        Contextual search is a single full-width input directly under the rail — the same row OM&apos;s{" "}
        <code>FilterBar</code> renders, with filter and export buttons eating in from the right. Give it a
        leading <code>size-4</code> search icon and a placeholder scoped to the screen (&quot;Search
        orders…&quot;), not a generic &quot;Search&quot;.
      </P>
      <ComponentPreview
        previewClassName="items-start p-6"
        code={`<div className="relative">
  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
  <Input placeholder="Search orders…" className="pl-9" />
</div>`}
      >
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search orders…" className="pl-9" />
        </div>
      </ComponentPreview>
      <P>
        Don&apos;t confuse this with <strong>global</strong> search (the <code>⌘K</code> box in the top
        bar) — that searches across the app. Contextual search filters the table on the current screen.
        See <a href="/docs/patterns/filter-bar">Filter Bar</a> and{" "}
        <a href="/docs/patterns/global-search">Global Search</a>.
      </P>

      <H2>Table</H2>
      <P>
        The table closes the stack. It runs <strong>edge-to-edge</strong> — no card border boxing it in —
        with a muted header row and columns flush to the content edge (<code>first:pl-0 last:pr-0</code>),
        so it lines up under the title rather than floating in a panel.
      </P>
      <ComponentPreview
        previewClassName="items-start p-6"
        code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Order</TableHead>
      <TableHead>Client</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Value</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>{/* rows */}</TableBody>
</Table>`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {HERO_ROWS.slice(0, 2).map(([id, client, status, value]) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{id}</TableCell>
                <TableCell>{client}</TableCell>
                <TableCell className="text-muted-foreground">{status}</TableCell>
                <TableCell className="text-right">{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ComponentPreview>
      <P>
        Full grid behaviour — sorting, pagination, row actions, perspectives — lives in{" "}
        <a href="/docs/patterns/data-table">Data Table</a>; the raw element styling is in{" "}
        <a href="/docs/components/table">Table</a>.
      </P>

      <OmMapping
        status="patched"
        files={[
          "@open-mercato/ui/backend/Page.js",
          "@open-mercato/ui/backend/DataTable.js",
          "@open-mercato/ui/primitives/tabs.js",
        ]}
      >
        <p>
          On a real OM screen this header is split across two components. <code>PageHeader</code> renders
          the title + description + actions (and a breadcrumb slot). For searchable lists, the{" "}
          <strong>
            <code>DataTable</code> drives its own header
          </strong>{" "}
          — pass <code>title</code>, <code>actions</code>, and <code>onSearchChange</code> and it lays out
          the title row + full-width search above the grid. The tab rail is the{" "}
          <code>Tabs</code> primitive&apos;s <code>variant=&quot;underline&quot;</code>; add{" "}
          <code>className=&quot;w-full&quot;</code> on <code>TabsList</code> for the Stripe-style separator.
        </p>
        <CodeBlock
          language="tsx"
          code={`{/* Report / tabbed page — PageHeader + Tabs */}
<PageHeader title="Zlecenia" description="…" />
<Tabs defaultValue="invoicing" variant="underline">
  <TabsList className="w-full">           {/* full-width separator rail */}
    <TabsTrigger value="invoicing">Fakturowanie</TabsTrigger>
    <TabsTrigger value="packing">Pakowanie</TabsTrigger>
  </TabsList>
  <TabsContent value="invoicing"> <Table>…</Table> </TabsContent>
</Tabs>

{/* Searchable list — let DataTable own the header */}
<DataTable title="Orders" actions={<Button><Plus/> New order</Button>}
           onSearchChange={setSearch} columns={cols} data={rows} />`}
        />
        <p>
          Worked example: the poc-4{" "}
          <code>printgood_planner/backend/zlecenia/page.tsx</code> screen uses the{" "}
          <code>PageHeader + underline Tabs + Table</code> half; <code>OrderListTable</code> uses the{" "}
          <code>DataTable</code> half. Requires the accent tokens from{" "}
          <a href="/docs/accent-color">Accent Color</a>.
        </p>
      </OmMapping>

      <DocsPager href="/docs/patterns/page-header" />
    </article>
  )
}
