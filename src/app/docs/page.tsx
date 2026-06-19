import Link from "next/link"
import { ArrowRightLeft, Sparkles, Wrench, Palette } from "lucide-react"
import { DocHeader, H2, P, UL } from "@/components/site/doc"
import { CodeBlock } from "@/components/site/code-block"
import { DocsPager } from "@/components/site/pager"

export default function IntroductionPage() {
  return (
    <article>
      <DocHeader
        title="Introduction"
        lead="A Stripe-style restyle of Open Mercato — documented component by component, each with the exact change you need to make on a real OM app."
      />

      <P>
        This is the design system behind our Open Mercato restyle. It is <strong>not</strong> a fork
        of Open Mercato — it&apos;s a thin, well-defined layer on top of stock{" "}
        <code>@open-mercato/* @ 0.6.5</code>, delivered three ways: a few{" "}
        <Link href="/docs/installation">npm package patches</Link>, a block of design tokens in your{" "}
        <code>globals.css</code>, and a handful of app-level slot components. Everything in these docs
        runs standalone — this site has zero <code>@open-mercato</code> dependency — but every page
        tells you precisely how the component maps back onto OM.
      </P>

      <H2>The four big ideas</H2>
      <UL>
        <li>
          <strong>A switchable accent system.</strong> One token ramp (<code>accent-solid</code>,{" "}
          <code>accent-subtle</code>, <code>accent-text</code>…) recolours every interactive surface.
          Flip <code>data-accent</code> on <code>&lt;html&gt;</code> to change the whole app&apos;s hue.
          See <Link href="/docs/accent-color">Accent Color</Link>.
        </li>
        <li>
          <strong>Stripe density.</strong> Shorter buttons (h-8), tighter nav rows, bigger page
          titles, flatter surfaces.
        </li>
        <li>
          <strong>Edge-to-edge content.</strong> Tables and toolbars lose their card chrome and align
          flush to the page title.
        </li>
        <li>
          <strong>An always-on global search</strong> in the topbar, and a left sidebar that never
          collapses.
        </li>
      </UL>

      <H2>How to read these docs</H2>
      <P>Every component page carries a “How it maps to OM” block, tagged with one of four states:</P>
      <div className="my-6 grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-lg border border-border p-4">
          <ArrowRightLeft className="mt-0.5 size-4 text-status-success-text" />
          <div className="text-sm">
            <p className="font-semibold text-foreground">Direct</p>
            <p className="text-muted-foreground">Ships with OM as-is. Just use it.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-border p-4">
          <Wrench className="mt-0.5 size-4 text-status-warning-text" />
          <div className="text-sm">
            <p className="font-semibold text-foreground">Patched</p>
            <p className="text-muted-foreground">A stock OM component our restyle edits via patch-package.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-border p-4">
          <Palette className="mt-0.5 size-4 text-status-info-text" />
          <div className="text-sm">
            <p className="font-semibold text-foreground">Token</p>
            <p className="text-muted-foreground">A pure CSS/token change — no component edits.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-border p-4">
          <Sparkles className="mt-0.5 size-4 text-accent-text" />
          <div className="text-sm">
            <p className="font-semibold text-foreground">New</p>
            <p className="text-muted-foreground">No stock-OM equivalent — built from scratch (e.g. the Workbench).</p>
          </div>
        </div>
      </div>

      <H2>Delivery in one minute</H2>
      <P>
        OM ships as compiled npm packages, so component edits are applied with{" "}
        <a href="https://www.npmjs.com/package/patch-package" target="_blank" rel="noreferrer">
          patch-package
        </a>{" "}
        on install. Token changes live in your app&apos;s <code>globals.css</code>.
      </P>
      <CodeBlock
        language="json"
        fileName="package.json"
        code={`{
  "scripts": {
    "postinstall": "npx --yes patch-package"
  }
}`}
      />
      <P>
        Head to <Link href="/docs/installation">Installation</Link> for the full setup, or jump
        straight to <Link href="/docs/accent-color">Accent Color</Link> to see the headline feature.
      </P>

      <DocsPager href="/docs" />
    </article>
  )
}
