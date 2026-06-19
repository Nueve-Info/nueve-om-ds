"use client"

import { Lock, FolderArchive, ArrowLeftRight, Search, Bell, Filter } from "lucide-react"
import { DocHeader, H2, P, UL } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

const CARDS = [
  { icon: Lock, title: "Encryption", desc: "Encrypt sensitive data (PII / GDPR)." },
  { icon: FolderArchive, title: "Storage", desc: "File and attachment storage configuration." },
  { icon: ArrowLeftRight, title: "Currency rates", desc: "Fetch and refresh exchange rates." },
  { icon: Search, title: "Search settings", desc: "Indexing and full-text search options." },
  { icon: Bell, title: "Notifications", desc: "In-app notification delivery strategies." },
  { icon: Filter, title: "Pipeline stages", desc: "Stages of the sales funnel." },
]

function SettingsCardGrid() {
  return (
    <div className="-mx-3 grid w-full grid-cols-1 gap-x-2 gap-y-1 sm:grid-cols-2">
      {CARDS.map((c) => (
        <a
          key={c.title}
          href="#"
          onClick={(e) => e.preventDefault()}
          className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-accent-subtle/50"
        >
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-accent-subtle text-accent-text">
            <c.icon className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block font-medium text-foreground transition-colors group-hover:text-accent-text">
              {c.title}
            </span>
            <span className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{c.desc}</span>
          </span>
        </a>
      ))}
    </div>
  )
}

export default function SettingsCardsPage() {
  return (
    <article>
      <DocHeader
        badge="New"
        title="Settings Cards"
        lead="Icon + title + description link cards in a grid — the OM settings landing pattern. Hover any card."
      />

      <P>
        A grid of link cards used for navigation hubs (the settings home, a module landing). The detail
        that makes it feel right: titles are <strong>neutral by default and turn accent on hover</strong>,
        so the hover actually lands and the grid reads as buttons — not a wall of blue links. The accent
        lives in the icon chip.
      </P>

      <ComponentPreview
        previewClassName="items-start p-6"
        code={`<a href="…" className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-accent-subtle/50">
  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-accent-subtle text-accent-text">
    <Lock className="size-4" />
  </span>
  <span className="min-w-0">
    <span className="block font-medium text-foreground transition-colors group-hover:text-accent-text">
      Encryption
    </span>
    <span className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
      Encrypt sensitive data (PII / GDPR).
    </span>
  </span>
</a>`}
      >
        <SettingsCardGrid />
      </ComponentPreview>

      <H2>Anatomy</H2>
      <UL>
        <li>
          <strong>Card</strong> — the whole card is the link and the hover target (<code>group</code>),
          with <code>hover:bg-accent-subtle/50</code> and a generous <code>rounded-xl</code> radius.
        </li>
        <li>
          <strong>Icon chip</strong> — a <code>size-8</code> rounded square, <code>bg-accent-subtle</code>{" "}
          with an <code>text-accent-text</code> lucide icon. This carries the accent at rest.
        </li>
        <li>
          <strong>Title</strong> — <code>text-foreground</code> by default,{" "}
          <code>group-hover:text-accent-text</code>. No underline — it&apos;s a button, not a link.
        </li>
        <li>
          <strong>Description</strong> — <code>text-sm text-muted-foreground</code>, clamped to two lines
          (<code>line-clamp-2</code>) so every card in the grid keeps the same height.
        </li>
      </UL>

      <H2>Grid</H2>
      <P>
        Lay cards out responsively — one column on mobile, two or three on wider screens — and pull the
        grid out by its own padding (<code>-mx-3</code>) so the hover fill aligns flush with the section
        heading above.
      </P>
      <CodeBlock
        language="tsx"
        code={`<div className="-mx-3 grid grid-cols-1 gap-x-2 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <SettingsCard key={item.href} {...item} />
  ))}
</div>`}
      />

      <OmMapping status="new" files={["src/app/(backend)/backend/settings/page.tsx"]}>
        <p>
          This is the <strong>OM settings landing</strong> pattern — a bespoke app page (no stock-OM
          equivalent) that lists every <code>pageContext: &quot;settings&quot;</code> page as a card,
          grouped by section. The restyle keys the title off <code>text-foreground</code> →{" "}
          <code>group-hover:text-accent-text</code> rather than a constant <code>text-accent-text</code>,
          which is the change that makes the hover read. Same card markup powers the section grids and the
          one-off cards (Appearance, Developers).
        </p>
      </OmMapping>

      <DocsPager href="/docs/patterns/settings-cards" />
    </article>
  )
}
