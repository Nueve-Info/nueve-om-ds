import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AccentSwitcher } from "@/components/site/accent-switcher"

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <section className="flex flex-col items-start gap-6 py-20 lg:py-28">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-subtle px-3 py-1 text-xs font-medium text-accent-text">
          <Sparkles className="size-3.5" />
          Built on top of Open Mercato 0.6.5
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          The design system behind the Open Mercato restyle.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          A Stripe-style restyle of the Open Mercato admin: a switchable accent system, denser
          components, edge-to-edge tables, and an always-on global search. Every component here
          documents <strong className="font-semibold text-foreground">exactly how it maps onto a real OM app</strong> —
          which ones ship as-is, which are patched, and which are brand new.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/docs" className={buttonVariants()}>
            Get started
            <ArrowRight className="size-4" />
          </Link>
          <Link href="/docs/components/button" className={buttonVariants({ variant: "outline" })}>
            Browse components
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-foreground">Try the switchable accent</p>
            <AccentSwitcher size="lg" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="success" dot>
              Active
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            One <code className="rounded bg-muted px-1 py-0.5 font-mono">data-accent</code> attribute recolours
            every component — no rebuild.
          </p>
        </div>
      </section>
    </div>
  )
}
