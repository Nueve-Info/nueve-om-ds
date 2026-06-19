"use client"

import { Plus, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocHeader, H2, P, PropsTable } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function ButtonPage() {
  return (
    <article>
      <DocHeader
        badge="Updated"
        title="Button"
        lead="Triggers an action. The default variant is accent-coloured and the control is one step shorter than stock OM (h-8)."
      />

      <ComponentPreview
        code={`<div className="flex flex-wrap items-center gap-3">
  <Button>Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Delete</Button>
  <Button variant="link">Link</Button>
</div>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="link">Link</Button>
        </div>
      </ComponentPreview>

      <H2>Usage</H2>
      <CodeBlock
        language="tsx"
        code={`import { Button } from "@open-mercato/ui/primitives/button"

<Button>Save</Button>
<Button variant="outline" size="sm">Cancel</Button>`}
      />

      <H2>Sizes</H2>
      <P>Default is <code>h-8</code>. <code>sm</code> is also h-8 (tighter padding), <code>lg</code> is h-10, and <code>icon</code> is a square 32px.</P>
      <ComponentPreview
        code={`<div className="flex items-center gap-3">
  <Button size="sm">Small</Button>
  <Button>Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon" aria-label="Add"><Plus /></Button>
</div>`}
      >
        <div className="flex items-center gap-3">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Add">
            <Plus />
          </Button>
        </div>
      </ComponentPreview>

      <H2>With icons</H2>
      <P>Primary call-to-actions in the restyle lead with a lucide icon (Add, Upload, Export…).</P>
      <ComponentPreview
        code={`<div className="flex items-center gap-3">
  <Button><Plus /> New order</Button>
  <Button variant="outline"><Download /> Export</Button>
</div>`}
      >
        <div className="flex items-center gap-3">
          <Button>
            <Plus /> New order
          </Button>
          <Button variant="outline">
            <Download /> Export
          </Button>
        </div>
      </ComponentPreview>

      <OmMapping status="patched" files={["@open-mercato/ui/primitives/button.js"]}>
        <p>
          Button ships with OM. The restyle <strong>patches the variant table</strong>: the default
          variant moves off <code>bg-primary</code> (near-black) onto the accent ramp, the link
          variant uses <code>text-accent-text</code>, and the control heights drop one step
          (default <code>h-9 → h-8</code>, icon <code>size-9 → size-8</code>). Because the recolour
          points at tokens, switching <code>data-accent</code> restyles every button for free.
        </p>
        <CodeBlock
          language="diff"
          fileName="patches/@open-mercato+ui+0.6.5.patch"
          code={`   variant: {
-    default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover",
+    default: "bg-accent-solid text-accent-solid-foreground shadow-xs hover:bg-accent-solid-hover",
     ...
-    link: "text-primary underline-offset-4 hover:underline"
+    link: "text-accent-text underline-offset-4 hover:underline"
   },
   size: {
-    default: "h-9 px-4 py-2 has-[>svg]:px-3",
+    default: "h-8 px-4 has-[>svg]:px-3",
     ...
-    icon: "size-9"
+    icon: "size-8"
   }`}
        />
        <p>
          Requires the accent tokens from <a href="/docs/accent-color">Accent Color</a> to be present
          in <code>globals.css</code>.
        </p>
      </OmMapping>

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "muted" | "destructive" | "link"', default: '"default"', description: "Visual style. default is accent-filled." },
          { name: "size", type: '"default" | "sm" | "lg" | "2xs" | "icon"', default: '"default"', description: "Control height/padding. default and sm are both h-8." },
          { name: "disabled", type: "boolean", description: "Greys out and blocks interaction." },
        ]}
      />

      <DocsPager href="/docs/components/button" />
    </article>
  )
}
