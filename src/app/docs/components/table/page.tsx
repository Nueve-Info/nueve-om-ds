"use client"

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DocHeader, H2, P, PropsTable } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function TablePage() {
  return (
    <article>
      <DocHeader
        badge="Updated"
        title="Table"
        lead="Low-level table primitives. The restyle makes the first/last columns flush to the content edge."
      />

      <P>
        These are the raw <code>&lt;table&gt;</code> building blocks — header, body, rows and cells. Most
        screens won&apos;t use them directly; they sit under the <a href="/docs/patterns/data-table">DataTable</a>{" "}
        pattern. The one change worth knowing about is horizontal padding on the edge columns.
      </P>

      <ComponentPreview
        code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Order</TableHead>
      <TableHead>Customer</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>#1042</TableCell>
      <TableCell>Acme Co.</TableCell>
      <TableCell><Badge variant="success">Paid</Badge></TableCell>
      <TableCell>$1,200.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>#1041</TableCell>
      <TableCell>Globex</TableCell>
      <TableCell><Badge variant="warning">Pending</Badge></TableCell>
      <TableCell>$640.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>#1040</TableCell>
      <TableCell>Initech</TableCell>
      <TableCell><Badge variant="error">Failed</Badge></TableCell>
      <TableCell>$0.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>#1042</TableCell>
              <TableCell>Acme Co.</TableCell>
              <TableCell>
                <Badge variant="success">Paid</Badge>
              </TableCell>
              <TableCell>$1,200.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#1041</TableCell>
              <TableCell>Globex</TableCell>
              <TableCell>
                <Badge variant="warning">Pending</Badge>
              </TableCell>
              <TableCell>$640.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#1040</TableCell>
              <TableCell>Initech</TableCell>
              <TableCell>
                <Badge variant="error">Failed</Badge>
              </TableCell>
              <TableCell>$0.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ComponentPreview>

      <H2>Usage</H2>
      <P>
        Compose the primitives by hand for one-off tables. Drop a <a href="/docs/components/badge">Badge</a> into a
        status cell and align numeric columns however you like — the primitives stay unopinionated about content.
      </P>
      <CodeBlock
        language="tsx"
        code={`import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@open-mercato/ui/primitives/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Order</TableHead>
      <TableHead>Total</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>#1042</TableCell>
      <TableCell>$1,200.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
      />

      <OmMapping status="patched" files={["@open-mercato/ui/primitives/table.js"]}>
        <p>
          Table ships with OM. The restyle <strong>patches the cell classes</strong> so the first and last
          columns lose their horizontal padding via <code>first:pl-0 last:pr-0</code>. The leftmost column
          now starts at the page&apos;s content edge and the rightmost ends at it — so column data lines up
          flush with the page title and toolbar above it, instead of being inset by <code>px-4</code>.
        </p>
        <CodeBlock
          language="diff"
          fileName="patches/@open-mercato+ui+0.6.5.patch"
          code={`- TableHead: "text-left font-medium px-4 py-2 whitespace-nowrap text-muted-foreground"
+ TableHead: "text-left font-medium px-4 py-2 first:pl-0 last:pr-0 whitespace-nowrap text-muted-foreground"
- TableCell: "px-4 py-2"
+ TableCell: "px-4 py-2 first:pl-0 last:pr-0"`}
        />
        <p>
          This only reads right when the table&apos;s container has no padding of its own — it&apos;s designed
          to pair with the borderless <a href="/docs/patterns/data-table">DataTable</a> container, which drops
          the card frame so the rows sit directly against the page gutter.
        </p>
      </OmMapping>

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: "Table", type: "HTMLTableElement props", description: "Root <table>, wrapped in an overflow-auto div." },
          { name: "TableHeader", type: "HTMLTableSectionElement props", description: "<thead>; bottom-borders its rows." },
          { name: "TableBody", type: "HTMLTableSectionElement props", description: "<tbody>; drops the border on the last row." },
          { name: "TableRow", type: "HTMLTableRowElement props", description: "<tr> with a bottom border and hover tint." },
          { name: "TableHead", type: "ThHTMLAttributes", description: "Header cell; muted, flush at first/last column." },
          { name: "TableCell", type: "TdHTMLAttributes", description: "Body cell; flush at first/last column." },
        ]}
      />

      <DocsPager href="/docs/components/table" />
    </article>
  )
}
