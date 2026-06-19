"use client"

import { Code2, ChevronUp } from "lucide-react"
import { DocHeader, H2, P, UL } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function DeveloperWorkbenchPage() {
  return (
    <article>
      <DocHeader
        badge="New"
        title="Developer Workbench"
        lead="A Stripe-style bottom dock that embeds developer/nerd pages as live iframe tabs — entirely new, no OM equivalent."
      />

      <P>
        The Workbench is a thin bar pinned to the bottom of the backend. Click it and a panel slides
        up with one tab per developer page — each rendering the <em>real</em> backend page inside an
        iframe, no rebuild, no second app. It is the fastest way to keep diagnostics, logs and
        scratch tools one keystroke away without ever leaving the page you were on.
      </P>

      <ComponentPreview
        previewClassName="items-end"
        code={`<div className="flex h-10 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm">
  <Code2 className="size-4" />
  <span className="font-medium">Workbench</span>
  <ChevronUp className="ml-auto size-4 text-muted-foreground" />
</div>`}
      >
        <div className="w-full max-w-md">
          <div className="flex h-10 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm">
            <Code2 className="size-4" />
            <span className="font-medium text-foreground">Workbench</span>
            <ChevronUp className="ml-auto size-4 text-muted-foreground" />
          </div>
        </div>
      </ComponentPreview>

      <H2>How it works</H2>
      <P>
        A persistent bar (~40px) is pinned to the bottom of the viewport. Clicking it slides up a
        panel hosting one tab per developer page, and each tab renders the actual backend route in an
        iframe — there is no parallel implementation to drift out of sync.
      </P>
      <UL>
        <li>
          Each iframe loads the backend page in <strong>embed mode</strong> via{" "}
          <code>?om_embed=1</code>, which tells the backend layout to drop the <code>AppShell</code>{" "}
          chrome (sidebar, topbar) and render just the page body.
        </li>
        <li>
          Iframes are <strong>lazy-mounted</strong>: a tab is only created the first time you open
          it, so cold pages cost nothing until used.
        </li>
        <li>
          Once mounted, iframes are <strong>kept alive</strong> (hidden, not unmounted) — switching
          tabs is instant and each page preserves its scroll position and form state.
        </li>
        <li>
          The bar reserves its own height by toggling a <code>has-workbench</code> class on the body,
          so content never hides behind the dock.
        </li>
      </UL>

      <H2>Wiring</H2>
      <P>
        The Workbench renders <strong>once</strong> into the backend layout and portals itself to{" "}
        <code>&lt;body&gt;</code> so it escapes any positioned ancestor and floats above the app. It
        is gated by the set of visible developer hrefs — if the current user can&apos;t see any dev
        pages, nothing mounts.
      </P>
      <P>
        Tabs are driven by a single <code>DEV_PAGES</code> list. Add a page there and it shows up as
        a tab; remove it and the tab disappears. No other code changes.
      </P>
      <CodeBlock
        language="tsx"
        fileName="src/lib/developerPages.ts"
        code={`export const DEV_PAGES = [
  { label: "GLU analysis", href: "/backend/dev/glu" },
  { label: "Styling notes", href: "/backend/dev/styling" },
  { label: "Event log", href: "/backend/dev/events" },
] as const

// Embed URL: same route, chrome stripped.
export const embedUrl = (href: string) =>
  \`\${href}?om_embed=1\``}
      />

      <OmMapping status="new" files={["src/components/DeveloperWorkbench.tsx", "src/lib/developerPages.ts"]}>
        <p>
          Brand new — Open Mercato has no bottom-dock or embedded-page concept, so the component and
          its page registry live entirely in app code. The only OM touch points are (a) an{" "}
          <strong>embed-mode branch</strong> in the backend layout that drops the chrome when{" "}
          <code>?om_embed=1</code> is present, and (b) a <code>has-workbench</code> spacing class that
          reserves the bar&apos;s height. There is <strong>no patch</strong> to any{" "}
          <code>@open-mercato</code> package.
        </p>
        <CodeBlock
          language="tsx"
          fileName="src/app/backend/layout.tsx"
          code={`export default function BackendLayout({ children, searchParams }) {
  // Embed mode: render the page body only, no AppShell chrome.
  if (searchParams.om_embed === "1") {
    return <main>{children}</main>
  }
  return (
    <AppShell>
      {children}
      <DeveloperWorkbench />
    </AppShell>
  )
}`}
        />
        <p>
          Because the iframes point at the live routes, anything you build as a normal backend page
          is automatically embeddable — registering it in <code>DEV_PAGES</code> is the whole
          integration.
        </p>
      </OmMapping>

      <DocsPager href="/docs/new/developer-workbench" />
    </article>
  )
}
