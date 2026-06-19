"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DocHeader, H2, P, UL } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function FilterBarPage() {
  return (
    <article>
      <DocHeader
        badge="Updated"
        title="Filter Bar"
        lead="Per-page contextual search becomes full-width; filter/action buttons shrink to the right."
      />

      <P>
        The Filter Bar sits at the top of every list page. Stock OM boxes the search input into a
        fixed-width column and lets the alignment flag decide whether it lands left or right. The
        restyle flips that priority: <strong>search is the primary action</strong>, so it stretches
        to fill the row, and the filter and action buttons collapse to a tight cluster on the right.
      </P>

      <ComponentPreview
        code={`<div className="flex items-center gap-2">
  <Input className="flex-1" placeholder="Search orders…" />
  <Button variant="outline">Filters</Button>
</div>`}
      >
        <div className="flex items-center gap-2">
          <Input className="flex-1" placeholder="Search orders…" />
          <Button variant="outline">Filters</Button>
        </div>
      </ComponentPreview>

      <H2>Anatomy</H2>
      <P>
        One row, two roles. The search input owns the slack; everything else is fixed-size and
        right-anchored.
      </P>
      <UL>
        <li>
          <strong>Search</strong> — a single full-width input (<code>flex-1 min-w-0</code>). It is
          always first in the source order, so left/right alignment no longer matters.
        </li>
        <li>
          <strong>Controls</strong> — Filters, view toggles and primary actions, wrapped in a{" "}
          <code>shrink-0</code> cluster that eats from the right edge inward.
        </li>
        <li>
          On narrow viewports the controls wrap below the search rather than squeezing it — the
          input never drops under a usable width.
        </li>
      </UL>

      <OmMapping status="patched" files={["@open-mercato/ui/backend/FilterBar.js"]}>
        <p>
          OM ships the FilterBar with a <strong>boxed, alignment-driven search</strong>: the input
          lives in a fixed <code>w-72 / w-80</code> column and a <code>search-align</code> flag
          pushes it left or right. The restyle <strong>repoints the layout</strong> — the search
          block becomes <code>flex-1 min-w-0</code> and always renders first, while the control
          cluster gains <code>shrink-0</code> so buttons consume only the space they need from the
          right.
        </p>
        <CodeBlock
          language="diff"
          fileName="patches/@open-mercato+ui.patch"
          code={`- searchBlock: <div className="w-full sm:w-72 lg:w-80"><SearchInput …/></div>
+ searchBlock: <div className="flex-1 min-w-0"><SearchInput …/></div>
- controls: flex flex-wrap items-center gap-2 (search-align driven)
+ controls: flex flex-wrap items-center gap-2 shrink-0 (buttons eat from the right)
// render order collapses left/right alignment into one always-first full-width search`}
        />
        <p>
          The <code>search-align</code> prop is now inert — every page gets the same full-width
          search, so callers can drop it. No new tokens are required; the change is pure layout.
        </p>
      </OmMapping>

      <DocsPager href="/docs/patterns/filter-bar" />
    </article>
  )
}
