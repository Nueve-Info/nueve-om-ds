"use client"

import { RadioGroup, Radio } from "@/components/ui/radio"
import { DocHeader, H2, P, PropsTable } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function RadioPage() {
  return (
    <article>
      <DocHeader
        badge="Updated"
        title="Radio"
        lead="Single-choice control. The checked dot uses the accent ramp (was indigo)."
      />

      <P>
        Radio picks exactly one option from a small, mutually exclusive set. Wrap a group of{" "}
        <code>Radio</code> rows in a <code>RadioGroup</code> and give the group a{" "}
        <code>defaultValue</code> to set the initial selection. When the choice toggles a yes/no
        state rather than picking from a list, reach for a <a href="/docs/components/switch">Switch</a> instead.
      </P>

      <ComponentPreview
        code={`<RadioGroup defaultValue="standard">
  <label className="flex items-center gap-2.5 text-sm text-foreground">
    <Radio value="standard" /> Standard shipping
  </label>
  <label className="flex items-center gap-2.5 text-sm text-foreground">
    <Radio value="express" /> Express (next day)
  </label>
  <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
    <Radio value="pickup" disabled /> Store pickup (unavailable)
  </label>
</RadioGroup>`}
      >
        <RadioGroup defaultValue="standard">
          <label className="flex items-center gap-2.5 text-sm text-foreground">
            <Radio value="standard" /> Standard shipping
          </label>
          <label className="flex items-center gap-2.5 text-sm text-foreground">
            <Radio value="express" /> Express (next day)
          </label>
          <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <Radio value="pickup" disabled /> Store pickup (unavailable)
          </label>
        </RadioGroup>
      </ComponentPreview>

      <H2>Usage</H2>
      <P>
        <code>RadioGroup</code> owns the selected value and threads it to its children through
        context, so each <code>Radio</code> only needs its own <code>value</code>. Leave it
        uncontrolled with <code>defaultValue</code>, or drive it from state with{" "}
        <code>value</code> + <code>onValueChange</code>.
      </P>
      <CodeBlock
        language="tsx"
        code={`import { RadioGroup, Radio } from "@open-mercato/ui/primitives/radio"

<RadioGroup defaultValue="standard">
  <label><Radio value="standard" /> Standard</label>
  <label><Radio value="express" /> Express</label>
</RadioGroup>`}
      />

      <OmMapping status="patched" files={["@open-mercato/ui/primitives/radio.js"]}>
        <p>
          Radio ships with OM. The restyle <strong>repoints the checked state</strong> off the
          hard-coded <code>accent-indigo</code> and onto the accent ramp, so the selected dot and
          its border follow whatever <code>data-accent</code> is set. Nothing else about the
          control changes — only the two checked-state utilities.
        </p>
        <CodeBlock
          language="diff"
          fileName="patches/@open-mercato+ui+0.6.5.patch"
          code={`- "data-[state=checked]:border-accent-indigo data-[state=checked]:bg-accent-indigo",
+ "data-[state=checked]:border-accent-solid data-[state=checked]:bg-accent-solid",`}
        />
        <p>
          Requires the accent tokens from <a href="/docs/accent-color">Accent Color</a> to be
          present in <code>globals.css</code>.
        </p>
      </OmMapping>

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: "value", type: "string", description: "RadioGroup: controlled selected value. Pair with onValueChange." },
          { name: "defaultValue", type: "string", description: "RadioGroup: initial selected value when uncontrolled." },
          { name: "onValueChange", type: "(value: string) => void", description: "RadioGroup: fires with the new value on selection." },
          { name: "value", type: "string", description: "Radio: this option's value; selected when it equals the group value." },
          { name: "disabled", type: "boolean", description: "Radio: greys out the dot and blocks selection." },
        ]}
      />

      <DocsPager href="/docs/components/radio" />
    </article>
  )
}
