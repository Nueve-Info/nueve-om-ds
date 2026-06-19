"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AccentSwitcher } from "@/components/site/accent-switcher"
import { DocHeader, H2, P, UL } from "@/components/site/doc"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

const RAMP: { token: string; cls: string; role: string }[] = [
  { token: "accent-solid", cls: "bg-accent-solid", role: "Filled buttons, checked controls, active tab underline" },
  { token: "accent-solid-hover", cls: "bg-accent-solid-hover", role: "Hover state on filled controls" },
  { token: "accent-solid-foreground", cls: "bg-accent-solid-foreground border border-border", role: "Text/icon on accent-solid (white)" },
  { token: "accent-subtle", cls: "bg-accent-subtle", role: "Active nav row, active vertical tab, badge tint" },
  { token: "accent-text", cls: "bg-accent-text", role: "Active nav text, back-links, link buttons" },
  { token: "accent-border", cls: "bg-accent-border", role: "Accent hairlines" },
]

export default function AccentColorPage() {
  return (
    <article>
      <DocHeader
        badge="New"
        title="Accent Color"
        lead="The headline of the restyle: one switchable accent ramp that recolours every interactive surface. Stock OM has no equivalent — it hard-codes near-black buttons and an indigo for selection controls."
      />

      <P>
        Pick a hue below — it flips <code>data-accent</code> on <code>&lt;html&gt;</code> and recolours
        this entire site live. The same attribute does the same thing on a real OM app.
      </P>

      <div className="my-6 space-y-5 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-foreground">Accent</span>
          <AccentSwitcher size="lg" />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="link">Link</Button>
          <Checkbox defaultChecked aria-label="demo" />
          <Switch defaultChecked aria-label="demo" />
          <Badge variant="accent">Accent</Badge>
        </div>
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a" count={12}>
              Orders
            </TabsTrigger>
            <TabsTrigger value="b" count={3}>
              Drafts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="a">
            <p className="text-sm text-muted-foreground">The active tab&apos;s underline + label follow the accent.</p>
          </TabsContent>
          <TabsContent value="b">
            <p className="text-sm text-muted-foreground">Drafts tab content.</p>
          </TabsContent>
        </Tabs>
      </div>

      <H2>The ramp</H2>
      <P>Six tokens cover every accent need. Each has a light and dark value (default = Tailwind blue).</P>
      <div className="my-6 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left">
            <tr className="border-b border-border">
              <th className="px-4 py-2.5 font-medium text-foreground">Swatch</th>
              <th className="px-4 py-2.5 font-medium text-foreground">Token</th>
              <th className="px-4 py-2.5 font-medium text-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            {RAMP.map((r) => (
              <tr key={r.token} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5">
                  <span className={`block size-6 rounded-md ${r.cls}`} />
                </td>
                <td className="px-4 py-2.5">
                  <code className="font-mono text-xs text-accent-text">{r.token}</code>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{r.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Defining the tokens</H2>
      <P>Expose the ramp to Tailwind inside your existing <code>@theme inline</code> block, then set the default (blue) values in <code>:root</code> and <code>.dark</code>.</P>
      <CodeBlock
        language="css"
        fileName="globals.css"
        code={`@theme inline {
  --color-accent-solid: var(--accent-solid);
  --color-accent-solid-foreground: var(--accent-solid-foreground);
  --color-accent-solid-hover: var(--accent-solid-hover);
  --color-accent-subtle: var(--accent-subtle);
  --color-accent-text: var(--accent-text);
  --color-accent-border: var(--accent-border);
}

:root {
  --accent-solid: oklch(0.546 0.245 262.881);      /* blue-600 */
  --accent-solid-foreground: #ffffff;
  --accent-solid-hover: oklch(0.488 0.243 264.376);/* blue-700 */
  --accent-subtle: oklch(0.97 0.014 254.604);      /* blue-50  */
  --accent-text: oklch(0.488 0.243 264.376);       /* blue-700 */
  --accent-border: oklch(0.882 0.059 254.128);     /* blue-200 */
}

.dark {
  --accent-solid: oklch(0.623 0.214 259.815);      /* blue-500 */
  --accent-solid-foreground: #ffffff;
  --accent-solid-hover: oklch(0.707 0.165 254.624);/* blue-400 */
  --accent-subtle: oklch(0.282 0.091 267.935);     /* blue-950 */
  --accent-text: oklch(0.707 0.165 254.624);       /* blue-400 */
  --accent-border: oklch(0.424 0.199 265.638);     /* blue-800 */
}`}
      />

      <H2>Switchable palettes</H2>
      <P>Add a palette block per hue. Setting <code>data-accent=&quot;green&quot;</code> on <code>&lt;html&gt;</code> overrides the ramp; omit it for blue.</P>
      <CodeBlock
        language="css"
        fileName="globals.css"
        code={`[data-accent="green"] {
  --accent-solid: oklch(0.596 0.145 163.225); --accent-solid-hover: oklch(0.508 0.118 165.612);
  --accent-subtle: oklch(0.979 0.021 166.113); --accent-text: oklch(0.508 0.118 165.612);
  --accent-border: oklch(0.905 0.093 164.15);
}
.dark [data-accent="green"], [data-accent="green"].dark {
  --accent-solid: oklch(0.696 0.17 162.48); --accent-solid-hover: oklch(0.765 0.177 163.223);
  --accent-subtle: oklch(0.262 0.051 172.552); --accent-text: oklch(0.765 0.177 163.223);
  --accent-border: oklch(0.432 0.095 166.913);
}
/* …red, orange, purple follow the same shape */`}
      />
      <UL>
        <li>Light shades: solid 600 · hover 700 · subtle 50 · text 700 · border 200.</li>
        <li>Dark shades: solid 500 · hover 400 · subtle 950 · text 400 · border 800.</li>
        <li>Also point native controls at the ramp: <code>input[type=checkbox] {`{ accent-color: var(--accent-solid) }`}</code>.</li>
      </UL>

      <OmMapping status="token" files={["src/app/globals.css"]}>
        <p>
          This is a <strong>pure token addition</strong> — no component files change here. It is the
          foundation every other &ldquo;Patched&rdquo; component depends on: Button, Checkbox, Radio,
          Switch, Tabs and the AppShell nav all get repointed from <code>bg-primary</code> /{" "}
          <code>accent-indigo</code> onto this ramp by their patches. Add these tokens first; then the
          component patches have something to resolve against.
        </p>
      </OmMapping>

      <DocsPager href="/docs/accent-color" />
    </article>
  )
}
