"use client"

import { Badge } from "@/components/ui/badge"
import { DocHeader, H2, P, PropsTable } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function BadgePage() {
  return (
    <article>
      <DocHeader
        title="Badge"
        lead="A small label for status and counts."
      />

      <P>
        Badges are static, non-interactive pills. Use them to tag a row with its
        state, surface a count next to a label, or call out a single attribute.
        The <code>accent</code> variant ties into the switchable accent ramp; the
        semantic variants map onto OM&apos;s status tokens.
      </P>

      <ComponentPreview
        code={`<div className="flex flex-wrap items-center gap-3">
  <Badge>Default</Badge>
  <Badge variant="accent">Accent</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </ComponentPreview>

      <H2>Status</H2>
      <P>
        Five semantic variants cover the common lifecycle states. Add <code>dot</code> for
        a leading indicator when the colour alone is doing too much work — it inherits the
        text colour so it stays in sync automatically.
      </P>
      <ComponentPreview
        code={`<div className="flex flex-wrap items-center gap-3">
  <Badge variant="success" dot>Active</Badge>
  <Badge variant="warning" dot>Pending</Badge>
  <Badge variant="error" dot>Failed</Badge>
  <Badge variant="info">Info</Badge>
  <Badge variant="neutral">Draft</Badge>
</div>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="success" dot>
            Active
          </Badge>
          <Badge variant="warning" dot>
            Pending
          </Badge>
          <Badge variant="error" dot>
            Failed
          </Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="neutral">Draft</Badge>
        </div>
      </ComponentPreview>

      <OmMapping status="direct" files={["@open-mercato/ui status tokens"]}>
        <p>
          OM already ships <code>StatusBadge</code> plus the semantic{" "}
          <code>status-*</code> tokens (success / warning / error / info / neutral),
          so the status variants here are a <strong>direct reuse</strong> — same colours,
          same backgrounds, same borders. The only addition is the <code>accent</code>{" "}
          variant, which simply tints with the accent ramp (<code>bg-accent-subtle</code> /{" "}
          <code>text-accent-text</code>) so it tracks <code>data-accent</code> for free.
        </p>
        <p>On a real OM app, drive the existing component off your state map:</p>
        <CodeBlock
          language="tsx"
          code={`import { StatusBadge } from "@open-mercato/ui/primitives/status-badge"

const statusMap = {
  active: "success",
  pending: "warning",
  failed: "error",
} as const

<StatusBadge variant={statusMap[status]} dot>
  {label}
</StatusBadge>`}
        />
      </OmMapping>

      <H2>API</H2>
      <PropsTable
        rows={[
          {
            name: "variant",
            type: '"default" | "accent" | "secondary" | "outline" | "success" | "warning" | "error" | "info" | "neutral"',
            default: '"default"',
            description: "Visual style. default is accent-filled; success…neutral use the status tokens.",
          },
          {
            name: "dot",
            type: "boolean",
            default: "false",
            description: "Renders a leading dot in the current text colour.",
          },
        ]}
      />

      <DocsPager href="/docs/components/badge" />
    </article>
  )
}
