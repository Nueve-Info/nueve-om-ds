import { DocsSidebar } from "@/components/site/sidebar"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] gap-8 px-4 sm:px-6 lg:px-8">
      <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-60 shrink-0 overflow-y-auto md:block">
        <DocsSidebar />
      </aside>
      <main className="min-w-0 flex-1 py-8 lg:py-10">
        <div className="mx-auto w-full max-w-3xl">{children}</div>
      </main>
    </div>
  )
}
