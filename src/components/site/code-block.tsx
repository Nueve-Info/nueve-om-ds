import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

export interface CodeBlockProps {
  code: string
  /** "tsx" | "css" | "bash" | "diff" | "json" … shown as a label; "diff" also colours +/- lines. */
  language?: string
  fileName?: string
  className?: string
}

/**
 * Dependency-free dark code surface with a copy button. `language="diff"` colours
 * added/removed lines (used by the "Implementation" sections). For full syntax
 * highlighting, swap the <code> body for Shiki later — the API stays the same.
 */
export function CodeBlock({ code, language, fileName, className }: CodeBlockProps) {
  const trimmed = code.replace(/\n+$/, "")
  const isDiff = language === "diff"
  const lines = trimmed.split("\n")

  return (
    <div className={cn("group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 text-[13px]", className)}>
      {(fileName || language) && (
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <span className="font-mono text-xs text-zinc-400">{fileName ?? language}</span>
          {language && fileName ? (
            <span className="font-mono text-[10px] uppercase tracking-wide text-zinc-600">{language}</span>
          ) : null}
        </div>
      )}
      <div className="absolute right-2 top-2 z-10">
        <CopyButton value={trimmed} />
      </div>
      <pre className="overflow-x-auto p-4 leading-relaxed">
        <code className="font-mono text-zinc-200">
          {isDiff
            ? lines.map((line, i) => {
                const add = line.startsWith("+") && !line.startsWith("+++")
                const del = line.startsWith("-") && !line.startsWith("---")
                const meta = line.startsWith("@@")
                return (
                  <span
                    key={i}
                    className={cn(
                      "block",
                      add && "bg-emerald-500/10 text-emerald-300",
                      del && "bg-red-500/10 text-red-300",
                      meta && "text-sky-400",
                    )}
                  >
                    {line || " "}
                  </span>
                )
              })
            : trimmed}
        </code>
      </pre>
    </div>
  )
}
