"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DocHeader, H2, P } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function DataTablePage() {
  return (
    <article>
      <DocHeader
        badge="Updated"
        title="Data Table"
        lead="The full data grid: edge-to-edge (no card border), a big title, and an icon on the export button."
      />

      <P>
        The restyle drops the card frame that boxed stock OM&apos;s grid in and lets the table run
        edge-to-edge against the page. The header gets a real <code>text-2xl</code> page title and the
        export action picks up a leading icon, so a list view reads like a screen rather than a widget
        wedged inside a panel.
      </P>

      <ComponentPreview
        code={`<div className="w-full rounded-lg bg-card p-4">
  <div className="flex items-center justify-between pb-2">
    <h2 className="text-2xl font-semibold tracking-tight">Orders</h2>
    <Button variant="outline">
      <Download className="size-4" /> Export
    </Button>
  </div>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Order</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Total</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">#1042</TableCell>
        <TableCell>Acme Co.</TableCell>
        <TableCell><Badge variant="success" dot>Paid</Badge></TableCell>
        <TableCell className="text-right">$248.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">#1041</TableCell>
        <TableCell>Globex</TableCell>
        <TableCell><Badge variant="warning" dot>Pending</Badge></TableCell>
        <TableCell className="text-right">$1,120.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">#1040</TableCell>
        <TableCell>Initech</TableCell>
        <TableCell><Badge variant="neutral" dot>Draft</Badge></TableCell>
        <TableCell className="text-right">$64.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>`}
        previewClassName="block items-stretch"
      >
        <div className="w-full rounded-lg bg-card p-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Orders</h2>
            <Button variant="outline">
              <Download className="size-4" /> Export
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-foreground">#1042</TableCell>
                <TableCell>Acme Co.</TableCell>
                <TableCell>
                  <Badge variant="success" dot>
                    Paid
                  </Badge>
                </TableCell>
                <TableCell className="text-right">$248.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-foreground">#1041</TableCell>
                <TableCell>Globex</TableCell>
                <TableCell>
                  <Badge variant="warning" dot>
                    Pending
                  </Badge>
                </TableCell>
                <TableCell className="text-right">$1,120.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-foreground">#1040</TableCell>
                <TableCell>Initech</TableCell>
                <TableCell>
                  <Badge variant="neutral" dot>
                    Draft
                  </Badge>
                </TableCell>
                <TableCell className="text-right">$64.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </ComponentPreview>

      <H2>Anatomy</H2>
      <P>
        Three changes turn the stock grid into the screen above: drop the container border so the table
        is flush with the page, swap the small section heading for a <code>text-2xl</code> title, and add
        a <code>{`<Download />`}</code> icon to the export button. The cells themselves get their flush
        gutters from the <a href="/docs/components/table">Table</a> primitive — its first/last columns
        zero out their side padding so values line up with the title and the page edge.
      </P>

      <OmMapping status="patched" files={["@open-mercato/ui/backend/DataTable.js"]}>
        <p>
          <code>DataTable</code> ships with OM as a card: a bordered container, a small{" "}
          <code>text-base</code> heading, and a plain text export link. The restyle{" "}
          <strong>patches the wrapper classes</strong> — it removes the container border and side
          margins so the grid goes edge-to-edge, trims the header padding, bumps the title to{" "}
          <code>text-2xl</code>, and gives the export button a leading <code>Download</code> icon.
        </p>
        <CodeBlock
          language="diff"
          fileName="patches/@open-mercato+ui.patch"
          code={`- containerClassName = embedded ? "" : "rounded-lg border bg-card mx-1 sm:mx-2";
+ containerClassName = embedded ? "" : "rounded-lg bg-card";
- headerWrapperClassName = embedded ? "pb-3" : "px-4 py-3 border-b";
+ headerWrapperClassName = embedded ? "pb-3" : "py-3";
- title: text-base font-semibold … min-h-[2.25rem]
+ title: text-2xl font-semibold
// export button gains a leading <Download className="size-4" /> icon`}
        />
        <p>
          Pairs with the <a href="/docs/components/table">Table</a> patch: the flush{" "}
          <code>first:pl-0 last:pr-0</code> cells are what let the columns align to the new
          borderless edge instead of sitting inside card padding.
        </p>
      </OmMapping>

      <DocsPager href="/docs/patterns/data-table" />
    </article>
  )
}
