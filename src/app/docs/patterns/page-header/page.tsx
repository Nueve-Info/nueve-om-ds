"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocHeader, H2, P } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function PageHeaderPage() {
  return (
    <article>
      <DocHeader
        badge="Updated"
        title="Page Header"
        lead="Bigger titles, an accent back-link, and optional breadcrumb/tabs slots."
      />

      <P>
        Every backend screen opens with the same anatomy: an optional accent back-link, a large
        page title, and a primary action parked on the right. The restyle bumps the title one type
        step and recolours the back-link onto the accent ramp, so the eye lands on the page name
        first and the way out second.
      </P>

      <ComponentPreview
        code={`<div className="space-y-4">
  <div className="flex items-start justify-between gap-4">
    <div className="space-y-1">
      <a href="#" className="inline-flex items-center gap-1 text-sm text-accent-text">
        <ArrowLeft className="size-4" /> Orders
      </a>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Order #1024</h1>
    </div>
    <Button>Edit order</Button>
  </div>
</div>`}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <a href="#" className="inline-flex items-center gap-1 text-sm text-accent-text">
                <ArrowLeft className="size-4" /> Orders
              </a>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Order #1024</h1>
            </div>
            <Button>Edit order</Button>
          </div>
        </div>
      </ComponentPreview>

      <H2>PageHeader</H2>
      <P>
        The shared <code>PageHeader</code> gains two slots. A <strong>breadcrumb</strong> renders
        above the title in <code>accent-text</code>, and a <strong>tabs</strong> row drops into a
        line below it — both optional, both collapsing to nothing when unset. The title itself moves
        from <code>text-xl sm:text-2xl</code> up to <code>text-2xl sm:text-3xl</code> and picks up{" "}
        <code>tracking-tight</code>. The whole stack is wrapped in <code>space-y-4</code> so the
        breadcrumb, title row, and tabs space evenly without ad-hoc margins.
      </P>
      <CodeBlock
        language="tsx"
        code={`<PageHeader
  breadcrumb={<Breadcrumbs items={crumbs} />}
  title="Order #1024"
  actions={<Button>Edit order</Button>}
  tabs={<Tabs defaultValue="details">…</Tabs>}
/>`}
      />

      <H2>Form headers</H2>
      <P>
        The <code>EditHeader</code> and <code>DetailHeader</code> wrappers used inside forms share
        the same treatment. Their back-links move off <code>text-muted-foreground</code> onto{" "}
        <code>text-accent-text hover:underline</code>, and their titles are bumped to the same{" "}
        <code>text-2xl sm:text-3xl</code> scale. The result is one consistent header voice whether
        you are looking at a record, editing it, or filling a fresh form.
      </P>

      <OmMapping
        status="patched"
        files={["@open-mercato/ui/backend/Page.js", "@open-mercato/ui/backend/forms/FormHeader.js"]}
      >
        <p>
          Both headers ship with OM. The restyle <strong>patches the title classes</strong> and adds
          a breadcrumb slot to <code>Page</code>, then repoints the <code>FormHeader</code> back-link
          onto the accent ramp. No new components — just bigger type and accent-coloured links that
          follow <code>data-accent</code> for free.
        </p>
        <CodeBlock
          language="diff"
          code={`- <h1 className="text-xl sm:text-2xl font-semibold leading-tight">{title}</h1>
+ <h1 className="text-2xl sm:text-3xl font-semibold leading-tight tracking-tight">{title}</h1>
  // + new breadcrumb slot:
+ breadcrumb ? <div className="text-sm text-accent-text">{breadcrumb}</div> : null
- backHref ? <Link className="text-sm text-muted-foreground hover:text-foreground"> (FormHeader)
+ backHref ? <Link className="text-sm text-accent-text hover:underline">`}
        />
        <p>
          Requires the accent tokens from <a href="/docs/accent-color">Accent Color</a> so the
          back-link and breadcrumb resolve against the ramp.
        </p>
      </OmMapping>

      <DocsPager href="/docs/patterns/page-header" />
    </article>
  )
}
