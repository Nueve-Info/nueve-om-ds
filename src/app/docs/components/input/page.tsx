"use client"

import { Input } from "@/components/ui/input"
import { DocHeader, H2, P, PropsTable } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function InputPage() {
  return (
    <article>
      <DocHeader
        title="Input"
        lead="A text field. h-8 to match the restyle's denser controls; focus uses the dual-ring shadow."
      />

      <ComponentPreview
        code={`<div className="flex max-w-sm flex-col gap-4">
  <Input placeholder="Search orders…" />
  <Input placeholder="Disabled" disabled />
  <div className="space-y-1.5">
    <label htmlFor="email" className="text-sm font-medium text-foreground">
      Email
    </label>
    <Input id="email" type="email" placeholder="you@example.com" />
  </div>
</div>`}
      >
        <div className="flex max-w-sm flex-col gap-4">
          <Input placeholder="Search orders…" />
          <Input placeholder="Disabled" disabled />
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
        </div>
      </ComponentPreview>

      <H2>Usage</H2>
      <P>
        Pair every input with a <code>&lt;label&gt;</code> wired through <code>htmlFor</code>. The field
        is full-width by default — constrain it with a wrapper, not a fixed width on the input itself.
      </P>
      <CodeBlock
        language="tsx"
        code={`import { Input } from "@open-mercato/ui/primitives/input"

<label htmlFor="sku" className="text-sm font-medium">SKU</label>
<Input id="sku" placeholder="PG-0001" />`}
      />

      <H2>Focus &amp; disabled</H2>
      <P>
        On focus the border darkens to <code>foreground</code> and the <code>--shadow-focus</code> ring
        lands underneath — a dual-ring look rather than the stock single outline. Disabled inputs drop to
        50% opacity and block the cursor.
      </P>

      <OmMapping status="direct" files={["@open-mercato/ui/primitives/input"]}>
        <p>
          Inputs <strong>ship with OM</strong> — the restyle keeps the component as-is and never patches
          it. They simply inherit the shared rhythm: the shorter <code>h-8</code> control height and the{" "}
          <code>--shadow-focus</code> ring picked up from{" "}
          <a href="/docs/theming">theming</a>. Native <code>checkbox</code> and <code>radio</code>{" "}
          accent-color is repointed to <code>accent-solid</code> in <code>globals.css</code>, so even
          unstyled native controls follow the chosen accent.
        </p>
        <CodeBlock
          language="css"
          fileName="globals.css"
          code={`input[type="checkbox"],
input[type="radio"] {
  accent-color: var(--accent-solid);
}`}
        />
      </OmMapping>

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: "type", type: "string", default: '"text"', description: "Native input type — text, email, number, search, etc." },
          { name: "placeholder", type: "string", description: "Muted hint text shown while the field is empty." },
          { name: "disabled", type: "boolean", description: "Greys the field to 50% opacity and blocks interaction." },
        ]}
      />

      <DocsPager href="/docs/components/input" />
    </article>
  )
}
