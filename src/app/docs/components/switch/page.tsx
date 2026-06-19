"use client"

import { Switch } from "@/components/ui/switch"
import { DocHeader, H2, P, PropsTable } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function SwitchPage() {
  return (
    <article>
      <DocHeader
        badge="Updated"
        title="Switch"
        lead="An on/off toggle. The checked track uses the accent ramp (was indigo)."
      />

      <P>
        Use a Switch for a setting that takes effect immediately — no Save button. The track is grey
        when off and fills with <code>accent-solid</code> when on, so a row of switches reads at a
        glance against the rest of the accent-coloured UI.
      </P>

      <ComponentPreview
        code={`<div className="flex items-center gap-6">
  <label className="flex items-center gap-2 text-sm">
    <Switch defaultChecked aria-label="on" /> On
  </label>
  <label className="flex items-center gap-2 text-sm">
    <Switch aria-label="off" /> Off
  </label>
  <label className="flex items-center gap-2 text-sm">
    <Switch disabled aria-label="disabled" /> Disabled
  </label>
</div>`}
      >
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <Switch defaultChecked aria-label="on" /> On
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Switch aria-label="off" /> Off
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Switch disabled aria-label="disabled" /> Disabled
          </label>
        </div>
      </ComponentPreview>

      <H2>Usage</H2>
      <P>
        Pair every Switch with a label and an <code>aria-label</code>. For controlled state, drive it
        with <code>checked</code> + <code>onCheckedChange</code>; otherwise pass{" "}
        <code>defaultChecked</code> and let it manage itself.
      </P>
      <CodeBlock
        language="tsx"
        code={`import { Switch } from "@open-mercato/ui/primitives/switch"

<Switch defaultChecked aria-label="Email notifications" />`}
      />

      <OmMapping status="patched" files={["@open-mercato/ui/primitives/switch.js"]}>
        <p>
          Switch ships with OM. The restyle <strong>repoints the checked track</strong> off the
          hard-coded <code>accent-indigo</code> onto <code>accent-solid</code>, so the toggle follows
          whichever hue <code>data-accent</code> selects — same as Button, Checkbox and Radio. Only the
          checked-state classes change; geometry and motion are untouched.
        </p>
        <CodeBlock
          language="diff"
          fileName="patches/@open-mercato+ui+0.6.5.patch"
          code={`- "group-data-[state=checked]:bg-accent-indigo group-data-[state=checked]:group-hover:bg-accent-indigo/85"
+ "group-data-[state=checked]:bg-accent-solid group-data-[state=checked]:group-hover:bg-accent-solid/85"`}
        />
        <p>
          Requires the accent tokens from <a href="/docs/accent-color">Accent Color</a> to be present
          in <code>globals.css</code>.
        </p>
      </OmMapping>

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: "checked", type: "boolean", description: "Controlled on/off state. Pair with onCheckedChange." },
          { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state for uncontrolled use." },
          { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Fires with the next state when toggled." },
          { name: "disabled", type: "boolean", description: "Greys out and blocks interaction." },
        ]}
      />

      <DocsPager href="/docs/components/switch" />
    </article>
  )
}
