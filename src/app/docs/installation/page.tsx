"use client"

import { DocHeader, H2, P, Steps, Step, Callout } from "@/components/site/doc"
import { CodeBlock } from "@/components/site/code-block"
import { OmMapping } from "@/components/site/om-mapping"
import { DocsPager } from "@/components/site/pager"

export default function InstallationPage() {
  return (
    <article>
      <DocHeader
        title="Installation"
        lead="Apply the restyle to a stock Open Mercato 0.6.5 app — patches, tokens, slots."
      />

      <P>
        The restyle is additive. You drop a handful of <code>patch-package</code> diffs over OM&apos;s
        published files, add one accent ramp to <code>globals.css</code>, and hang a few slot
        components off the AppShell. No fork, no vendored copy — five steps and a reinstall.
      </P>

      <Steps>
        <Step title="Add the patches">
          <P>
            Copy <code>patches/@open-mercato+ui+0.6.5.patch</code>,{" "}
            <code>patches/@open-mercato+core+0.6.5.patch</code> and{" "}
            <code>patches/@open-mercato+search+0.6.5.patch</code> into your app&apos;s{" "}
            <code>patches/</code> folder, then add a <code>postinstall</code> hook so they re-apply on
            every install.
          </P>
          <CodeBlock
            language="json"
            fileName="package.json"
            code={`{
  "scripts": {
    "postinstall": "npx --yes patch-package"
  }
}`}
          />
          <Callout variant="warning" title="Pinned to 0.6.5">
            These diffs are generated against the exact line numbers in{" "}
            <code>@open-mercato/*@0.6.5</code>. On any other version <code>patch-package</code> will
            fail to apply cleanly — the edits have to be re-created by hand against the new source.
          </Callout>
        </Step>

        <Step title="Add the accent tokens">
          <P>
            Paste the accent ramp — the six <code>--accent-*</code> custom properties plus their{" "}
            <code>@theme inline</code> bindings — into your <code>globals.css</code>. It&apos;s the
            foundation every patched component resolves against. The full CSS lives on the{" "}
            <a href="/docs/accent-color">Accent Color</a> page.
          </P>
        </Step>

        <Step title="Pick an accent">
          <P>
            Set <code>data-accent</code> on the <code>&lt;html&gt;</code> element to choose a hue —{" "}
            <code>green</code>, <code>red</code>, <code>orange</code> or <code>purple</code>. Omit the
            attribute entirely for the default blue.
          </P>
          <CodeBlock language="tsx" code={`<html lang="en" data-accent="green">`} />
        </Step>

        <Step title="Wire the AppShell slots">
          <P>
            In your backend <code>layout.tsx</code>, feed the restyle&apos;s slot components into the
            AppShell: <code>leftHeaderSlot</code> / <code>rightHeaderSlot</code> for the topbar,{" "}
            <code>sidebarNavAppendSlot</code> for the extra nav section, and{" "}
            <code>sidebarFooterSlot</code> for the org switcher. See{" "}
            <a href="/docs/patterns/app-shell">App Shell</a> for what each slot expects.
          </P>
          <CodeBlock
            language="tsx"
            fileName="src/app/backend/layout.tsx"
            code={`<AppShell
  leftHeaderSlot={<TopbarSearch />}
  sidebarNavAppendSlot={<SidebarOtherSection />}
  sidebarFooterSlot={<BackendSidebarOrgSwitcher />}
  version={APP_VERSION}
>
  {children}
</AppShell>`}
          />
        </Step>

        <Step title="Verify">
          <P>
            Reinstall. The <code>postinstall</code> hook runs <code>patch-package</code>, which
            re-applies every diff in <code>patches/</code> over the freshly fetched OM packages. A
            clean run prints one green line per patch.
          </P>
          <CodeBlock language="bash" code={`yarn install`} />
        </Step>
      </Steps>

      <OmMapping status="direct" files={["patches/*.patch", "src/app/globals.css"]}>
        <p>
          There is <strong>no fork of Open Mercato</strong> anywhere in this restyle. Everything is
          layered on top of the stock <code>0.6.5</code> packages: the visual changes are{" "}
          <code>patch-package</code> diffs against published files, the accent ramp is a token-only
          addition to <code>globals.css</code>, and the new UI (topbar search, the OTHER nav section,
          the org switcher) is plain slot components you pass into the AppShell.
        </p>
        <p>
          That keeps the upgrade story honest — bump the OM version, re-create the three patches
          against the new source, and the tokens and slot components carry over untouched.
        </p>
      </OmMapping>

      <DocsPager href="/docs/installation" />
    </article>
  )
}
