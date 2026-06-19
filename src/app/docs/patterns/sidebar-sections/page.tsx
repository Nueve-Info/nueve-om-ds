"use client"

import { DocHeader, H2, P, UL, Callout } from "@/components/site/doc"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function SidebarSectionsPage() {
  return (
    <article>
      <DocHeader
        badge="New"
        title="Sidebar Sections"
        lead="Stripe-style sidebar grouping — static section labels, no dividers, and a custom collapsible 'OTHER' section."
      />

      <P>
        Stock OM ships an accordion sidebar: every group is a clickable toggle separated by a hairline,
        and a scroll chevron appears when the list overflows. The restyle flattens that into a calmer,
        Stripe-style layout — group headers become quiet uppercase labels, the dividers and chevron
        disappear, and one section (<code>OTHER</code>) is rebuilt as a real React component so it can
        animate. Most of this is pure CSS; only the <code>OTHER</code> section needs code.
      </P>

      <H2>Static section labels</H2>
      <P>
        The framework renders each group header as a button with <code>aria-expanded</code>. Rather than
        fight the markup, we neutralise it in CSS: <code>pointer-events: none</code> turns the headers
        into non-interactive uppercase labels (while leaving the real toggle on our own{" "}
        <code>OTHER</code> section alone via <code>:not(.pg-section-toggle)</code>), the{" "}
        <code>.border-t</code> dividers are hidden, and the overflow scroll chevron is removed. Section
        order is then forced with flex <code>order</code> keyed to known nav item hrefs, so SALES /
        PRODUKCJA / TOWAR land in the sequence we want regardless of registration order.
      </P>
      <CodeBlock
        language="css"
        fileName="globals.css"
        code={`[data-testid="sidebar"] [aria-expanded]:not(.pg-section-toggle) { pointer-events: none; margin-top: 1.25rem; }
[data-testid="sidebar"] .border-t { display: none; }
[data-testid="sidebar-scroll-chevron"] { display: none !important; }
/* hide native groups that the React 'OTHER' section replaces */
[data-testid="sidebar"] > div:has(a[href="/backend/refdata/articles"]):not([data-pg-nav-append]) { display: none; }`}
      />
      <Callout variant="warning">
        This block is keyed to <strong>your</strong> route hrefs (
        <code>/backend/refdata/articles</code> and friends) and the framework&apos;s{" "}
        <code>data-testid</code> hooks. Swap the selectors for your own nav targets before reusing it —
        copy it verbatim and the rules will silently match nothing.
      </Callout>

      <H2>The &apos;OTHER&apos; section (new)</H2>
      <P>
        Section labels are static, but <code>OTHER</code> needs to expand and collapse — so it can&apos;t
        be CSS alone. It is a real component, <code>SidebarOtherSection</code>, mounted through the
        AppShell&apos;s <code>sidebarNavAppendSlot</code>. It renders two collapsible buttons whose panels
        animate with the <code>grid-rows: 0fr → 1fr</code> trick (no fixed height, no JS measuring), each
        carrying the <code>.pg-section-toggle</code> class so the CSS above keeps their{" "}
        <code>aria-expanded</code> interactive. The component is tagged{" "}
        <code>data-pg-nav-append</code>, which lets the divider rule above hide the native duplicate
        groups via <code>:not([data-pg-nav-append])</code> while leaving our version visible.
      </P>
      <UL>
        <li>
          Mounted once via <code>sidebarNavAppendSlot</code> — no fork of the framework sidebar.
        </li>
        <li>
          Panels animate with <code>grid-template-rows: 0fr</code> → <code>1fr</code> plus{" "}
          <code>overflow: hidden</code>; nothing measures pixel heights.
        </li>
        <li>
          Each toggle keeps <code>.pg-section-toggle</code> so it stays clickable; everything else in the
          sidebar is flattened.
        </li>
      </UL>

      <OmMapping status="new" files={["src/app/globals.css", "src/components/SidebarOtherSection.tsx"]}>
        <p>
          Split nature: the flattening is a <strong>token/CSS change</strong> in{" "}
          <code>globals.css</code> that restyles the stock sidebar in place, but the{" "}
          <code>OTHER</code> section itself is a <strong>brand-new app component</strong> with no
          stock-OM equivalent — OM has no animated, slot-mounted nav section to patch. It depends on the
          AppShell exposing a <a href="/docs/patterns/app-shell">sidebarNavAppendSlot</a>; without that
          insertion point there is nowhere to mount <code>SidebarOtherSection</code>, and the CSS would
          hide the native groups with nothing to replace them.
        </p>
      </OmMapping>

      <DocsPager href="/docs/patterns/sidebar-sections" />
    </article>
  )
}
