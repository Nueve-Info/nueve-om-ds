"use client"

import { DocHeader, H2, P, UL } from "@/components/site/doc"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function AppShellPage() {
  return (
    <article>
      <DocHeader
        badge="Updated"
        title="App Shell"
        lead="The backend frame: a left sidebar that never collapses, a content-aligned borderless topbar, and three new slots."
      />

      <P>
        <code>AppShell</code> is the single component every backend page renders inside. The restyle
        keeps OM&apos;s structure but rewrites the chrome around your content: the sidebar is now a
        fixed fixture, the topbar sheds its borders and lines up with the page, and three new slots
        let features inject search, sidebar sections, and footer content without forking the shell.
      </P>

      <H2>No-collapse sidebar</H2>
      <P>
        Stock OM lets the sidebar collapse to icons and swaps its contents to a settings or profile
        menu when you navigate into those areas. We don&apos;t. <code>effectiveCollapsed</code> is
        forced to <code>false</code> and the collapse toggle is removed, so the nav is always at full
        width. <code>sidebarMode</code> is locked to <code>&quot;main&quot;</code>: settings and
        profile pages render as full-width content while the primary navigation stays exactly where
        it is. One stable map of the app, no context-switching rail.
      </P>

      <H2>Denser, accent nav</H2>
      <P>
        The active row moves off the grey <code>bg-muted</code> highlight onto the accent ramp —{" "}
        <code>bg-accent-subtle text-accent-text</code> — and the left active bar is dropped, since
        the tint now carries the state. Rows tighten from <code>px-3 py-2 gap-2</code> to{" "}
        <code>py-1.5 gap-2.5</code>, and the list gap drops from <code>gap-2</code> to{" "}
        <code>gap-1</code>, so more of the app fits above the fold. Create / &ldquo;new&rdquo; child
        routes are hidden from the tree — those live on their list pages, not in navigation.
      </P>
      <UL>
        <li>
          Active row: <code>bg-muted text-foreground</code> → <code>bg-accent-subtle text-accent-text</code>.
        </li>
        <li>Left active bar removed; the subtle tint is the only active affordance.</li>
        <li>
          Row metrics: <code>px-3 py-2 gap-2</code> → <code>py-1.5 gap-2.5</code>; list <code>gap-2</code> → <code>gap-1</code>.
        </li>
      </UL>

      <H2>Content-aligned topbar</H2>
      <P>
        The header loses its <code>border-b</code> and its own side padding, then wraps its content in{" "}
        <code>mx-auto max-w-screen-2xl px-4 lg:px-6</code> — the same container as{" "}
        <code>&lt;main&gt;</code> — so everything in the topbar sits on the same left edge as the page
        below it. The breadcrumb is gone; the back-link moved into each page header where it belongs.
        The footer bar is hidden too, with the version string relocated to the bottom of the sidebar.
        The result is a borderless top strip that reads as part of the page, not a separate band.
      </P>

      <H2>Three new slots</H2>
      <P>
        Three optional render slots let features extend the shell without patching it. Each has one
        job and one place:
      </P>
      <UL>
        <li>
          <code>leftHeaderSlot</code> — lives in the topbar, content-aligned; hosts the global search
          field. See <a href="/docs/patterns/global-search">Global Search</a>.
        </li>
        <li>
          <code>sidebarNavAppendSlot</code> — rendered as the last child of the nav; hosts the
          &ldquo;OTHER&rdquo; section below the primary tree. See{" "}
          <a href="/docs/patterns/sidebar-sections">Sidebar Sections</a>.
        </li>
        <li>
          <code>sidebarFooterSlot</code> — sticky at the bottom of the sidebar; holds the org switcher
          stacked above the version line.
        </li>
      </UL>

      <H2>The patch</H2>
      <P>
        The behavioural changes are a handful of one-line edits to the shell&apos;s render logic — the
        collapse and mode locks, plus the active-row recolour.
      </P>
      <CodeBlock
        language="diff"
        fileName="patches/@open-mercato+ui.patch"
        code={`- const effectiveCollapsed = collapsed;
+ const effectiveCollapsed = false;
- const sidebarMode = isOnSettingsPath ? "settings" : isOnProfilePath ? "profile" : "main";
+ const sidebarMode = "main";
- \${isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"}
+ \${isActive ? "bg-accent-subtle text-accent-text" : "text-muted-foreground hover:bg-muted"}`}
      />
      <P>
        The slots are additive props on <code>AppShellProps</code> — all optional, all{" "}
        <code>React.ReactNode</code>, so existing call sites keep working unchanged.
      </P>
      <CodeBlock
        language="tsx"
        fileName="AppShell.tsx"
        code={`type AppShellProps = {
  // …existing props
  leftHeaderSlot?: React.ReactNode
  sidebarFooterSlot?: React.ReactNode
  sidebarNavAppendSlot?: React.ReactNode
}`}
      />

      <OmMapping
        status="patched"
        files={["@open-mercato/ui/backend/AppShell.js", "@open-mercato/ui/src/backend/AppShell.tsx"]}
      >
        <p>
          <code>AppShell</code> ships with OM; the restyle <strong>patches it in place</strong> rather
          than replacing it. The collapse and <code>sidebarMode</code> locks, the borderless
          content-aligned topbar, the denser accent nav, and the three new slots are all edits to the
          stock component — no fork, and call sites that don&apos;t pass the new slots are unaffected.
        </p>
        <p>
          The new slots are consumed by feature patterns: the global search field drops into{" "}
          <a href="/docs/patterns/global-search">leftHeaderSlot</a>, and the &ldquo;OTHER&rdquo; group
          plus the rest of the grouped tree go through{" "}
          <a href="/docs/patterns/sidebar-sections">sidebarNavAppendSlot</a>. The active-row recolour
          resolves against the tokens from <a href="/docs/accent-color">Accent Color</a>, so the nav
          follows <code>data-accent</code> for free.
        </p>
      </OmMapping>

      <DocsPager href="/docs/patterns/app-shell" />
    </article>
  )
}
