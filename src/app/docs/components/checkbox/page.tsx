"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { DocHeader, H2, P, PropsTable } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function CheckboxPage() {
  return (
    <article>
      <DocHeader
        badge="Updated"
        title="Checkbox"
        lead="A selection control. Checked/indeterminate states use the accent ramp (was indigo)."
      />

      <P>
        Checkbox is a single binary control — use it for table-row selection, opt-ins, and filter
        toggles. The restyle repoints every selected surface (the box fill, the focus ring, and the
        hover border) at the accent ramp, so the control follows whatever <code>data-accent</code> is
        set. It also supports an <code>indeterminate</code> state for &ldquo;some but not all&rdquo;
        parent checkboxes.
      </P>

      <ComponentPreview
        previewClassName="flex flex-col items-start gap-4"
        code={`<div className="flex flex-col gap-4">
  <label className="flex items-center gap-2 text-sm">
    <Checkbox defaultChecked aria-label="a" />
    Checked
  </label>
  <label className="flex items-center gap-2 text-sm">
    <Checkbox aria-label="b" />
    Unchecked
  </label>
  <label className="flex items-center gap-2 text-sm">
    <Checkbox checked="indeterminate" aria-label="c" />
    Indeterminate
  </label>
  <label className="flex items-center gap-2 text-sm opacity-70">
    <Checkbox disabled aria-label="d" />
    Disabled
  </label>
</div>`}
      >
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <Checkbox defaultChecked aria-label="a" />
            Checked
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <Checkbox aria-label="b" />
            Unchecked
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <Checkbox checked="indeterminate" aria-label="c" />
            Indeterminate
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground opacity-70">
            <Checkbox disabled aria-label="d" />
            Disabled
          </label>
        </div>
      </ComponentPreview>

      <H2>Usage</H2>
      <CodeBlock
        language="tsx"
        code={`import { Checkbox } from "@open-mercato/ui/primitives/checkbox"

<Checkbox defaultChecked />
<Checkbox checked="indeterminate" />
<Checkbox disabled />`}
      />

      <OmMapping status="patched" files={["@open-mercato/ui/primitives/checkbox.js"]}>
        <p>
          Checkbox ships with OM, hard-wired to <code>accent-indigo</code>. The restyle is a{" "}
          <strong>1:1 token swap</strong> — every <code>accent-indigo</code> reference becomes{" "}
          <code>accent-solid</code> across the focus ring, the checked fill, the indeterminate fill,
          and the hover border. Nothing else about the control changes.
        </p>
        <CodeBlock
          language="diff"
          fileName="patches/@open-mercato+ui+0.6.5.patch"
          code={`- focus-visible:ring-accent-indigo/40 … data-[state=checked]:bg-accent-indigo data-[state=checked]:text-accent-indigo-foreground data-[state=checked]:border-accent-indigo data-[state=indeterminate]:bg-accent-indigo … hover:border-accent-indigo/60
+ focus-visible:ring-accent-solid/40 … data-[state=checked]:bg-accent-solid data-[state=checked]:text-accent-solid-foreground data-[state=checked]:border-accent-solid data-[state=indeterminate]:bg-accent-solid … hover:border-accent-solid/60`}
        />
        <p>
          Because the swap points at tokens, it needs the accent tokens from{" "}
          <a href="/docs/accent-color">Accent Color</a> present in <code>globals.css</code>; once they
          are, the box recolours for free on every accent.
        </p>
      </OmMapping>

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: "checked", type: 'boolean | "indeterminate"', description: "Controlled state. Pass \"indeterminate\" for the mixed state." },
          { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
          { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Fires on toggle with the next boolean value." },
          { name: "disabled", type: "boolean", description: "Greys out and blocks interaction." },
        ]}
      />

      <DocsPager href="/docs/components/checkbox" />
    </article>
  )
}
