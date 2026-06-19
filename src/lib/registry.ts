export type NavItem = {
  title: string
  href: string
  /** Optional pill shown next to the nav item. */
  badge?: "New" | "Updated"
}

export type NavGroup = {
  title: string
  items: NavItem[]
}

/**
 * The Design System site map. Each item maps 1:1 to an `app/docs/<slug>/page.tsx`.
 * Groups mirror the shadcn docs structure: Getting Started → Foundations →
 * Components → Patterns (the OM-shell-level pieces) → New (things with no
 * stock-OM equivalent).
 */
export const nav: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "How it maps to OM", href: "/docs/mapping" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Accent Color", href: "/docs/accent-color", badge: "New" },
      { title: "Theming & Tokens", href: "/docs/theming" },
      { title: "Typography", href: "/docs/typography" },
      { title: "Colors", href: "/docs/colors" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Button", href: "/docs/components/button", badge: "Updated" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Checkbox", href: "/docs/components/checkbox", badge: "Updated" },
      { title: "Radio", href: "/docs/components/radio", badge: "Updated" },
      { title: "Switch", href: "/docs/components/switch", badge: "Updated" },
      { title: "Tabs", href: "/docs/components/tabs", badge: "Updated" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Table", href: "/docs/components/table", badge: "Updated" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { title: "App Shell", href: "/docs/patterns/app-shell", badge: "Updated" },
      { title: "Page Header", href: "/docs/patterns/page-header", badge: "Updated" },
      { title: "Data Table", href: "/docs/patterns/data-table", badge: "Updated" },
      { title: "Filter Bar", href: "/docs/patterns/filter-bar", badge: "Updated" },
      { title: "Global Search", href: "/docs/patterns/global-search", badge: "New" },
      { title: "Sidebar Sections", href: "/docs/patterns/sidebar-sections", badge: "New" },
      { title: "Settings Cards", href: "/docs/patterns/settings-cards", badge: "New" },
    ],
  },
  {
    title: "New on OM",
    items: [
      { title: "Developer Workbench", href: "/docs/new/developer-workbench", badge: "New" },
    ],
  },
]

/** Flattened, ordered list — used for prev/next paging at the bottom of each page. */
export const flatNav: NavItem[] = nav.flatMap((g) => g.items)

export function getPager(href: string): { prev?: NavItem; next?: NavItem } {
  const i = flatNav.findIndex((it) => it.href === href)
  if (i === -1) return {}
  return { prev: flatNav[i - 1], next: flatNav[i + 1] }
}
