import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { getPager } from "@/lib/registry"

/** Prev/next footer paging, shadcn-style. */
export function DocsPager({ href }: { href: string }) {
  const { prev, next } = getPager(href)
  if (!prev && !next) return null
  return (
    <div className="mt-14 flex items-center justify-between border-t border-border pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {next.title}
          <ArrowRight className="size-4" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  )
}
