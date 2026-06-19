"use client"

import { DocHeader, H2, P, UL, Callout } from "@/components/site/doc"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

const SPECIMEN: { cls: string; token: string }[] = [
  { cls: "text-3xl font-semibold tracking-tight", token: "text-3xl" },
  { cls: "text-2xl font-semibold tracking-tight", token: "text-2xl" },
  { cls: "text-xl font-semibold", token: "text-xl" },
  { cls: "text-lg font-medium", token: "text-lg" },
  { cls: "text-base", token: "text-base" },
  { cls: "text-sm", token: "text-sm" },
  { cls: "text-xs", token: "text-xs" },
]

export default function TypographyPage() {
  return (
    <article>
      <DocHeader
        title="Typography"
        lead="Use the Tailwind type scale — never arbitrary sizes. Plus the restyle's bigger headings."
      />

      <P>
        There is one type scale and it is Tailwind&apos;s. Every size on the page resolves to a step on
        that scale — body copy at <code>text-sm</code>, section titles at <code>text-2xl</code>, the odd
        uppercase label at <code>text-overline</code>. The moment you reach for{" "}
        <code>text-[13px]</code> you&apos;ve left the system, so don&apos;t.
      </P>

      <div className="my-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {SPECIMEN.map((s) => (
          <div key={s.token} className="flex items-baseline justify-between gap-6 px-5 py-4">
            <span className={`${s.cls} text-foreground`}>The quick brown fox</span>
            <code className="shrink-0 font-mono text-xs text-accent-text">{s.token}</code>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-6 px-5 py-4">
          <span className="text-overline text-muted-foreground">The quick brown fox</span>
          <code className="shrink-0 font-mono text-xs text-accent-text">text-overline</code>
        </div>
      </div>

      <H2>Scale</H2>
      <P>
        Seven steps cover everything from fine print to page titles. The pixel values are fixed — pick the
        nearest step, never an arbitrary size in between.
      </P>
      <UL>
        <li><code>text-xs</code> — 12px</li>
        <li><code>text-sm</code> — 14px (default body copy in the admin)</li>
        <li><code>text-base</code> — 16px</li>
        <li><code>text-lg</code> — 18px</li>
        <li><code>text-xl</code> — 20px</li>
        <li><code>text-2xl</code> — 24px</li>
        <li><code>text-3xl</code> — 30px</li>
        <li><code>text-overline</code> — 11px, uppercase, tracked-out label</li>
      </UL>
      <Callout variant="warning" title="No arbitrary sizes">
        Never write <code>text-[11px]</code> or <code>text-[13px]</code>. If you need an 11px uppercase
        label use <code>text-overline</code>; for anything else snap to the nearest scale step. Arbitrary
        sizes don&apos;t respond to the scale and quietly drift apart across screens.
      </Callout>

      <H2>Bigger headings in the restyle</H2>
      <P>
        The restyle pushes the primary headings up one step so pages lead with a confident title rather
        than a timid one. Page titles move from <code>text-xl sm:text-2xl</code> to{" "}
        <code>text-2xl sm:text-3xl</code> with <code>tracking-tight</code>, and the data-table title jumps
        from <code>text-base</code> to <code>text-2xl</code> so a list view reads like a real page header.
      </P>
      <CodeBlock
        language="diff"
        fileName="patches/@open-mercato+ui+0.6.5.patch"
        code={`-      <h1 className="text-xl font-semibold sm:text-2xl">
+      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">

-      <h2 className="text-base font-semibold">{title}</h2>
+      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>`}
      />
      <P>
        These live in the Page / FormHeader and DataTable patches — see{" "}
        <a href="/docs/patterns/page-header">Page header</a> for the full title block and how the
        breadcrumb, actions and tabs sit beneath it.
      </P>

      <OmMapping
        status="token"
        files={["src/app/globals.css", "patches/@open-mercato+ui+0.6.5.patch"]}
      >
        <p>
          The scale itself is <strong>stock OM</strong> — Tailwind&apos;s default steps, untouched. The
          only addition in CSS is the <code>text-overline</code> utility (11px, uppercase, letter-spaced)
          declared in <code>globals.css</code>; everything else you already have.
        </p>
        <p>
          The <strong>bigger headings are patched</strong>, not tokenised: the Page, FormHeader and
          DataTable components bump their title classes one step up the same scale. No new sizes are
          invented — the restyle just picks a higher rung.
        </p>
      </OmMapping>

      <DocsPager href="/docs/typography" />
    </article>
  )
}
