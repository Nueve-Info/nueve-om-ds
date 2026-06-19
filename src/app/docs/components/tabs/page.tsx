"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DocHeader, H2, P, PropsTable } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function TabsPage() {
  return (
    <article>
      <DocHeader
        badge="Updated"
        title="Tabs"
        lead="Underline tabs. The active underline, label and count badge use the accent ramp (was indigo)."
      />

      <P>
        A horizontal tablist with an underline indicator. The selected tab gets an accent underline, an
        accent label and an accent-tinted count badge — everything that used to be hard-coded indigo now
        resolves against <code>data-accent</code>, so switching hue restyles the active state for free.
      </P>

      <ComponentPreview
        code={`<Tabs defaultValue="orders">
  <TabsList>
    <TabsTrigger value="orders" count={24}>Orders</TabsTrigger>
    <TabsTrigger value="drafts" count={3}>Drafts</TabsTrigger>
    <TabsTrigger value="archived">Archived</TabsTrigger>
  </TabsList>
  <TabsContent value="orders">
    <p className="text-sm text-muted-foreground">24 open orders waiting to be picked and packed.</p>
  </TabsContent>
  <TabsContent value="drafts">
    <p className="text-sm text-muted-foreground">3 unfinished drafts saved on this account.</p>
  </TabsContent>
  <TabsContent value="archived">
    <p className="text-sm text-muted-foreground">Archived orders are read-only and hidden from the main list.</p>
  </TabsContent>
</Tabs>`}
      >
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders" count={24}>
              Orders
            </TabsTrigger>
            <TabsTrigger value="drafts" count={3}>
              Drafts
            </TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <p className="text-sm text-muted-foreground">24 open orders waiting to be picked and packed.</p>
          </TabsContent>
          <TabsContent value="drafts">
            <p className="text-sm text-muted-foreground">3 unfinished drafts saved on this account.</p>
          </TabsContent>
          <TabsContent value="archived">
            <p className="text-sm text-muted-foreground">Archived orders are read-only and hidden from the main list.</p>
          </TabsContent>
        </Tabs>
      </ComponentPreview>

      <H2>Usage</H2>
      <P>
        Drive the active tab with <code>defaultValue</code> for uncontrolled use, or pair{" "}
        <code>value</code> with <code>onValueChange</code> to control it. Pass an optional{" "}
        <code>count</code> to a trigger to render the trailing badge.
      </P>
      <CodeBlock
        language="tsx"
        code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@open-mercato/ui/primitives/tabs"

<Tabs defaultValue="orders">
  <TabsList>
    <TabsTrigger value="orders" count={24}>Orders</TabsTrigger>
    <TabsTrigger value="drafts" count={3}>Drafts</TabsTrigger>
  </TabsList>
  <TabsContent value="orders">…</TabsContent>
  <TabsContent value="drafts">…</TabsContent>
</Tabs>`}
      />

      <OmMapping status="patched" files={["@open-mercato/ui/primitives/tabs.js"]}>
        <p>
          Tabs ship with OM. The restyle <strong>repoints the selected-state classes</strong> off the
          fixed <code>accent-indigo</code> onto the accent ramp: the underline becomes{" "}
          <code>border-accent-solid</code>, the label and leading icon use <code>text-accent-text</code>{" "}
          / <code>text-accent-solid</code>, and the count badge tints with <code>bg-accent-solid/10</code>.
          The vertical variant follows suit with <code>bg-accent-subtle</code>.
        </p>
        <CodeBlock
          language="diff"
          fileName="patches/@open-mercato+ui+0.6.5.patch"
          code={`- isSelected ? (vertical ? "bg-muted/40 text-foreground" : "border-accent-indigo font-semibold text-foreground") : ""
+ isSelected ? (vertical ? "bg-accent-subtle text-accent-text" : "border-accent-solid font-semibold text-accent-text") : ""
- isSelected ? "text-accent-indigo" : "text-muted-foreground"            // leading icon
+ isSelected ? "text-accent-solid" : "text-muted-foreground"
- isSelected ? "bg-accent-indigo/10 text-accent-indigo" : …               // count badge
+ isSelected ? "bg-accent-solid/10 text-accent-solid" : …`}
        />
        <p>
          Requires the accent tokens from <a href="/docs/accent-color">Accent Color</a> to be present in{" "}
          <code>globals.css</code>.
        </p>
      </OmMapping>

      <H2>API</H2>
      <PropsTable
        rows={[
          { name: "value", type: "string", description: "Active tab value (controlled)." },
          { name: "defaultValue", type: "string", description: "Initial active tab when uncontrolled." },
          { name: "onValueChange", type: "(value: string) => void", description: "Fires when the active tab changes." },
        ]}
      />
      <P>
        <code>TabsTrigger</code> takes its own props:
      </P>
      <PropsTable
        rows={[
          { name: "value", type: "string", description: "Identifies the tab; matches a TabsContent value." },
          { name: "count", type: "number", description: "Renders a trailing count badge, accent-tinted when active." },
          { name: "leading", type: "React.ReactNode", description: "Optional leading icon, accent-coloured when active." },
        ]}
      />

      <DocsPager href="/docs/components/tabs" />
    </article>
  )
}
