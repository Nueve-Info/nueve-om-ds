"use client"

import { DocHeader, H2, P, UL } from "@/components/site/doc"
import { ComponentPreview } from "@/components/site/component-preview"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function ThemingPage() {
  return (
    <article>
      <DocHeader
        title="Theming & Tokens"
        lead="The token layer the whole system resolves against — radii, shadows, typography, dark mode."
      />

      <P>
        Everything visual in the restyle bottoms out in CSS variables. Components never hard-code a
        colour, a corner, or an elevation — they point at a token, and the token has a value for both
        light and dark. Get this layer right and the rest of the system falls into place for free.
      </P>

      <H2>Radius</H2>
      <P>
        One base variable, <code>--radius</code> at <code>0.625rem</code>, drives the whole scale.
        Tailwind&apos;s <code>rounded-sm/md/lg/xl</code> derive from it, so nudging the base reshapes
        every card, input, and dialog at once. Controls sit at <code>md</code>; surfaces and dialogs
        step up to <code>lg</code> and <code>xl</code>.
      </P>
      <CodeBlock
        language="css"
        fileName="globals.css"
        code={`:root {
  --radius: 0.625rem;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}`}
      />

      <H2>Shadow scale</H2>
      <P>
        Four steps, each tuned to ink <code>#101828</code> rather than flat black — soft, slightly
        cool shadows that read as paper, not drop-shadow. <code>xs</code> sits under flat controls,{" "}
        <code>sm</code> under resting cards, <code>md</code> on hover, and <code>lg</code> under
        dialogs and popovers. In dark mode the same tokens swap to pure black at higher opacity, since
        coloured shadows disappear on a dark canvas.
      </P>
      <ComponentPreview
        previewClassName="bg-muted/30"
        code={`<div className="flex flex-wrap items-end gap-6">
  <div className="grid place-items-center size-20 rounded-lg border border-border bg-card shadow-xs text-xs text-muted-foreground">xs</div>
  <div className="grid place-items-center size-20 rounded-lg border border-border bg-card shadow-sm text-xs text-muted-foreground">sm</div>
  <div className="grid place-items-center size-20 rounded-lg border border-border bg-card shadow-md text-xs text-muted-foreground">md</div>
  <div className="grid place-items-center size-20 rounded-lg border border-border bg-card shadow-lg text-xs text-muted-foreground">lg</div>
</div>`}
      >
        <div className="flex flex-wrap items-end gap-6">
          <div className="grid size-20 place-items-center rounded-lg border border-border bg-card text-xs text-muted-foreground shadow-xs">
            xs
          </div>
          <div className="grid size-20 place-items-center rounded-lg border border-border bg-card text-xs text-muted-foreground shadow-sm">
            sm
          </div>
          <div className="grid size-20 place-items-center rounded-lg border border-border bg-card text-xs text-muted-foreground shadow-md">
            md
          </div>
          <div className="grid size-20 place-items-center rounded-lg border border-border bg-card text-xs text-muted-foreground shadow-lg">
            lg
          </div>
        </div>
      </ComponentPreview>
      <CodeBlock
        language="css"
        fileName="globals.css"
        code={`--shadow-xs: 0 1px 2px rgb(16 24 40 / 0.05);
--shadow-sm: 0 1px 3px rgb(16 24 40 / 0.08), 0 1px 2px rgb(16 24 40 / 0.06);
--shadow-md: 0 4px 12px rgb(16 24 40 / 0.08);
--shadow-lg: 0 12px 32px rgb(16 24 40 / 0.10);`}
      />

      <H2>Dark mode</H2>
      <P>
        Dark mode is a class, not a media query: toggle <code>.dark</code> on <code>&lt;html&gt;</code>
        and every token flips to its dark value. There is no separate dark stylesheet and no per-
        component override — each variable simply carries two definitions. Try the theme toggle in the
        header to watch this page repaint.
      </P>
      <UL>
        <li>
          Every token defined in <code>:root</code> has a counterpart in <code>.dark</code> — colours,
          shadows, and the accent ramp alike.
        </li>
        <li>
          Components stay theme-agnostic: they reference <code>bg-card</code>, <code>text-foreground</code>,{" "}
          <code>shadow-md</code> and let the cascade resolve the actual value.
        </li>
        <li>
          Shadows go pure black at higher opacity in <code>.dark</code> — the cool ink tint only reads
          on a light surface.
        </li>
      </UL>

      <H2>Focus ring</H2>
      <P>
        Keyboard focus uses a single <code>--shadow-focus</code> token: a dual ring — a tight inset
        halo in the surface colour plus an outer accent-coloured ring — applied through{" "}
        <code>box-shadow</code> so it never shifts layout. Because the outer ring resolves against the
        accent ramp, the focus colour tracks <code>data-accent</code> like everything else.
      </P>
      <CodeBlock
        language="css"
        fileName="globals.css"
        code={`--shadow-focus: 0 0 0 2px var(--background), 0 0 0 4px var(--accent-solid);`}
      />

      <OmMapping status="direct" files={["src/app/globals.css"]}>
        <p>
          These tokens ship with OM <strong>0.6.5 as-is</strong> — the radius scale, the shadow ramp,
          and the dark-mode pairings are all stock. Nothing in this page is patched or invented; the
          restyle consumes them unchanged and only layers the{" "}
          <a href="/docs/accent-color">accent ramp</a> on top so that focus rings, links, and filled
          controls pick up the switchable hue. Use these as the baseline; add the accent tokens next.
        </p>
      </OmMapping>

      <DocsPager href="/docs/theming" />
    </article>
  )
}
