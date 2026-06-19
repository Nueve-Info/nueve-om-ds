"use client"

import { Separator } from "@/components/ui/separator"
import { DocHeader, H2, P, PropsTable } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function SeparatorPage() {
  return (
    <article>
      <DocHeader
        title="Separator"
        lead="A thin divider between content."
      />

      <P>
        Separator is a one-pixel rule that draws on the <code>--border</code> token. Use it
        horizontally to split stacked sections, and vertically to fence off inline items inside a
        fixed-height row. It carries no spacing of its own — let the surrounding layout own the gap.
      </P>

      <ComponentPreview
        code={`<div className="space-y-4">
  <div>
    <p className="text-sm font-medium text-foreground">Account</p>
    <p className="text-sm text-muted-foreground">Manage your profile and preferences.</p>
  </div>
  <Separator />
  <div>
    <p className="text-sm font-medium text-foreground">Billing</p>
    <p className="text-sm text-muted-foreground">Invoices, plan and payment method.</p>
  </div>
</div>`}
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-foreground">Account</p>
            <p className="text-sm text-muted-foreground">Manage your profile and preferences.</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-foreground">Billing</p>
            <p className="text-sm text-muted-foreground">Invoices, plan and payment method.</p>
          </div>
        </div>
      </ComponentPreview>

      <H2>Vertical</H2>
      <P>
        Pass <code>orientation=&quot;vertical&quot;</code> to draw a column rule. The separator stretches
        to its parent&apos;s height, so the row needs a defined height — here an <code>h-5</code> flex row.
      </P>
      <ComponentPreview
        code={`<div className="flex h-5 items-center gap-3 text-sm text-muted-foreground">
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Components</span>
  <Separator orientation="vertical" />
  <span>Source</span>
</div>`}
      >
        <div className="flex h-5 items-center gap-3 text-sm text-muted-foreground">
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Components</span>
          <Separator orientation="vertical" />
          <span>Source</span>
        </div>
      </ComponentPreview>

      <OmMapping status="direct" files={["@open-mercato/ui"]}>
        <p>
          A plain divider that ships with OM as-is — the restyle changes nothing about it. It draws
          on the <code>--border</code> token, so it follows light and dark mode automatically and
          stays in step with every other hairline in the UI. No patch, no token override, just
          import and use.
        </p>
      </OmMapping>

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Axis of the rule. Vertical needs a height-constrained parent." },
          { name: "decorative", type: "boolean", default: "true", description: "When true, hidden from the a11y tree (role=\"none\"). Set false for a semantic separator." },
        ]}
      />

      <DocsPager href="/docs/components/separator" />
    </article>
  )
}
