"use client"

import { Search } from "lucide-react"
import { DocHeader, H2, P } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function GlobalSearchPage() {
  return (
    <article>
      <DocHeader
        badge="New"
        title="Global Search"
        lead="The topbar search is a permanently visible, filled, full-width bar — not a magnifier icon that expands."
      />

      <P>
        Stock OM ships a collapsed magnifier that expands into a fixed-width input on click. The
        restyle pins it open: a filled, muted bar that fills the available header width, so search is
        always one keystroke away and never shifts the layout when it opens.
      </P>

      <ComponentPreview
        code={`<div className="flex h-9 items-center gap-2 rounded-md border border-transparent bg-muted/60 px-3 text-sm w-full max-w-md">
  <Search className="size-4 text-muted-foreground" />
  <span className="text-muted-foreground">Search everything…</span>
</div>`}
      >
        <div className="flex h-9 items-center gap-2 rounded-md border border-transparent bg-muted/60 px-3 text-sm w-full max-w-md">
          <Search className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">Search everything…</span>
        </div>
      </ComponentPreview>

      <H2>Behaviour</H2>
      <P>
        The bar is <strong>always expanded</strong>. Closing the results popover clears the query but
        never collapses the input back to an icon, so the bar holds its width and position no matter
        what. This also fixes the stock bug where clicking a sidebar link minimised the search — that
        navigation no longer touches the expanded state at all.
      </P>

      <OmMapping status="patched" files={["@open-mercato/search/.../TopbarSearchInline.js"]}>
        <p>
          The search component ships with OM but defaults to collapsed. The restyle{" "}
          <strong>patches the inline search</strong>: it seeds <code>expanded</code> to{" "}
          <code>true</code>, makes the reset path keep the bar open while clearing only the query, and
          swaps the bordered/background fill for the full-width muted treatment.
        </p>
        <CodeBlock
          language="diff"
          fileName="patches/@open-mercato+search.patch"
          code={`- const [expanded, setExpanded] = React.useState(false);
+ const [expanded, setExpanded] = React.useState(true);
  // collapseAndReset: keep expanded — only clear the query
- className: "relative min-w-0 sm:w-[260px] md:w-[320px] …"
+ className: "relative min-w-0 sm:w-full …"
- "… border border-input bg-background … hover:bg-muted/40"
+ "… border border-transparent bg-muted/60 … hover:bg-muted/80"`}
        />
        <p>
          The bar lives in the <a href="/docs/patterns/app-shell">AppShell</a>{" "}
          <code>leftHeaderSlot</code>, which is what lets it span the header width instead of sitting
          in a fixed-size slot.
        </p>
      </OmMapping>

      <DocsPager href="/docs/patterns/global-search" />
    </article>
  )
}
