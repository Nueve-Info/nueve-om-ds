import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/site/theme-provider"
import { SiteHeader } from "@/components/site/site-header"
import { CommandMenuProvider } from "@/components/site/command-menu"

export const metadata: Metadata = {
  title: {
    default: "Open Mercato Design System",
    template: "%s — OM Design System",
  },
  description:
    "The design system behind the Open Mercato restyle — components, tokens, and exactly how each maps onto a real Open Mercato app.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-svh bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <CommandMenuProvider>
            <SiteHeader />
            {children}
          </CommandMenuProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
