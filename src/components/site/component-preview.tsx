"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CodeBlock } from "./code-block"

export interface ComponentPreviewProps {
  /** The live demo. */
  children: React.ReactNode
  /** The source shown under the Code tab. */
  code: string
  language?: string
  fileName?: string
  /** Extra classes on the preview surface (e.g. alignment). */
  previewClassName?: string
}

export function ComponentPreview({ children, code, language = "tsx", fileName, previewClassName }: ComponentPreviewProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview")
  return (
    <div className="my-6">
      <div className="flex items-center gap-4 border-b border-border">
        {(["preview", "code"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px border-b-2 px-1 py-2 text-sm font-medium capitalize transition-colors",
              tab === t
                ? "border-accent-solid font-semibold text-accent-text"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "preview" ? (
        <div
          className={cn(
            "flex min-h-[340px] w-full items-center justify-center rounded-b-lg border border-t-0 border-border bg-card p-10",
            previewClassName,
          )}
        >
          {children}
        </div>
      ) : (
        <div className="rounded-b-lg border border-t-0 border-border p-0">
          <CodeBlock code={code} language={language} fileName={fileName} className="rounded-t-none border-0" />
        </div>
      )}
    </div>
  )
}
