# Portfolio draft

Status: owner approved the combined portfolio/security release on 2026-10-26.
Earlier local-only notes below describe historical review stages. About/CV
revisions remain deferred; publication uses the reviewed portfolio and PDF.

## Current Worktree

As requested on 2026-10-20, prepare the portfolio alongside security hardening
for one later reviewed release. Active combined draft:
`/Users/sirmacm/.codex/worktrees/site-security/omribz.me`.
The original `/Users/sirmacm/Projects/omribz.me` draft is preserved untouched;
do not overwrite the combined draft with that older copy.
Provider setup is recorded in security.md. Publication is now authorized; verify
the deployed revision and live mobile behavior after the release.

## Direction

- Audience: hiring teams across security and agentic engineering.
- Permanent English `/portfolio` and Hebrew `/he/portfolio` pages.
- Keep the existing site colors, header, footer, and monospace headings.
- A more editorial page: readable sans-serif body, project hierarchy, direct evidence links.
- Tone: always open to interesting opportunities, without urgency or neediness.
- Three featured projects: Hachozeh, OSS Supporter, Security Research Harness.
- Supporting projects: Runtime Radar, Alon Porat, OmriBZ.me; Vault under working practices.
- Short summaries and role descriptions visible; deeper engineering notes expandable.
- Preserve honest agent attribution and experimental/maintenance status.
- Ownership clarification (2026-10-25): Omri owns the architecture and final
  technical decisions across all projects. He researches technologies and
  consults people as well as evaluating agent suggestions. Agents contribute
  ideas and substantial implementation; do not reduce his role to prompting
  or imply that he personally wrote every line.
- PDF is an English download, dated September 2026, not the primary reading surface.

## Evidence

Reviewed October 4, 2026: supplied PDF, public repos and selected implementation
files, private Alon Porat source, live public sites, release and PR records.

- 60 merged PRs in 33 external repositories; excludes `omribz156/*`.
- Highlighted merged PRs: Checkmarx/kics#8058, vercel/streamdown#582, DataDog/saluki#1671.
- Hachozeh and security harness links point to curated public snapshots.
- Alon Porat source remains private; only link to the live website.
- Runtime Radar screenshot copied from its public repo's `assets/screenshot.png`.
- No private research results, production records, or client configuration included.

Refreshed October 20, 2026:

- Public GitHub search still returns 60 merged PRs across 33 external repositories.
  Query: `is:pr is:merged is:public author:omribz156 -user:omribz156`.
  Counts are a dated snapshot, not a live counter; they describe the author's
  external contributions, not attribution of every PR to one workflow.
- All three highlighted PRs still report merged and authored by `omribz156`.
- Runtime Radar latest published release remains v0.1.0.
- Eight project/evidence links returned HTTP 200.
- New `hachozeh.jpg` and `alon-porat.jpg` are captures of the public, signed-out
  websites on October 20. They show actual interfaces, not invented mockups.
- The page keeps explicit agent attribution, maintenance/experimental labels,
  and the distinction between public source snapshots and production repositories.

## Hachozeh Architecture Story: 2026-10-25

Source distinction: personal ownership, independent research, consultation,
and motivation come from Omri's account on October 25. Git changes and migration
receipts corroborate the technical sequence, not who originated each idea.
Reviewed the local Hachozeh repository read-only; no product changes there.

- `487e86bd` (June 3): Astro SSR foundation and trending page. New Node adapter,
  server-rendered content, retained vanilla-JS interactions, progressive routes.
- `5361a789` (June 4): Astro migration proof slice, route/auth/mobile parity
  coverage. Completion receipt records June 8; distinguish implementation commits
  from later closeout and production deployment.
- `00ed264f` (June 12 merge): backend infrastructure migration. Dependency and
  HTTP-app diffs confirm Fastify, Zod, and Commander replacing hand-written
  routing, validation, and CLI plumbing. PostgreSQL and trading-domain ownership
  remain in place; this was not a database or trading-engine rewrite.
- `4ecf4e04` (June 22): Preact integration and portfolio islands. The plan and
  completion receipt identify whole-section repaints, search-cursor restoration,
  and unnecessary chart re-mounts as concrete maintenance/interaction problems.
  The view changed while the framework-independent data layer stayed intact.
- Related June 21-22 changes: `b762b0c0` market detail, `138eb225` settings/graphs,
  `57b12d7f` header/auth/overlay. Avoid claiming a precise first-ship ordering
  solely from the pilot document; parallel changes have overlapping dates.
- `78c902b9` (June 24): confirmed ClientRouter import/use in the shared layout;
  commit and related changes record hover prefetch, persistent header, script
  lifecycle adjustments, and menu/overlay navigation fixes. The architecture
  story must include client-side navigation added to the server-rendered base,
  not describe the resulting app as exclusively full-document navigation.

Source documents in the Hachozeh checkout:
`workspace/tasks/completed/astro-migration.md`,
`workspace/tasks/reference/backend-boundary-infra-migration.md`,
`workspace/docs/superpowers/specs/2026-06-21-portfolio-preact-island-pilot-design.md`,
`workspace/tasks/completed/portfolio-preact-migration.md`.
These are internal evidence pointers, not public links to the private repository.

Public story: architectural ownership through staged changes as the product grew,
with a concrete UI example and preserved domain/data boundaries. Do not claim
Astro was a prerequisite for accounts, measured scaling gains, or user adoption.
Follow-up account: Omri recalled MPA versus SPA as a selection factor, prioritizing
faster loading and lower perceived latency; open source was also a value. He
compared the experience with Polymarket/Kalshi and remembers follow-up adjustments
for smooth transitions. Competitor stack classifications are his recollection,
not independently verified facts, and are omitted from public copy. No comparative
benchmark has been reviewed: frame speed as the design goal, not proof that MPA
is universally faster or that Hachozeh outperforms those products. Alternative
stack names remain unknown; do not keep asking him to reconstruct them.

## OSS Supporter Motivation: 2026-10-25

Owner account: the objective was a recurring, structured contribution workflow,
not one chat that performs the entire process. Omri works across multiple
workstations and wanted a reusable approach that other people could also adopt.
This is a portability and repeatability design goal; it does not establish
third-party adoption, automatic state synchronization, or unattended scheduling.

Use "repeatable contribution workflow" rather than CI/CD for the overall project.
Describe specific CI or scheduling mechanisms only when separately verified.
Omri tentatively recalls using GPT-5.3 in Codex; the exact model/version is
uncertain and is intentionally omitted from public copy.
Follow-up account: the central philosophy is giving back to open-source projects
by directing otherwise-unused coding-agent capacity toward useful contributions.
Portability serves that purpose, not just Omri's personal convenience. He designed
the repository so a fresh agent can copy it and start without the originating
conversation, and reports running it on both Windows and macOS. This is fresh-start
portability, not a claim that in-progress sessions synchronize between machines.
Cross-platform operation is owner-reported; no new Windows/macOS runtime tests
were performed in this content interview. Public copy describes the design scope,
not zero-configuration compatibility with arbitrary agents or operating systems.
Avoid claiming everyone has unused tokens, proven third-party adoption, or that
maximizing token use is the objective. Useful, verified contributions remain the goal.

## Security Research Harness Motivation: 2026-10-25

Owner account: the main purpose was to give Codex a structured way to use security
tools and make the overall penetration-testing / vulnerability-research process
easier to follow, including bug-bounty work. Lead with agent usability and a
coherent research process, not the inventory of infrastructure components.
This describes intent, not demonstrated autonomous research effectiveness,
accepted reports, bounty payments, or authorization for any specific target.
Keep the experimental status and existing evidence limitations explicit.
Follow-up owner observation: Codex performed much of the actual research
independently of the harness. The harness became mainly a way to record work,
advance through formal stages, and wait, rather than make the investigation
easier. Describe this as a workflow-design limitation / process overhead, not
proof that logging or safety boundaries are inherently bad. Do not infer
fabricated evidence, deliberate evasion, or a particular technical root cause.
The draft now replaces the earlier broad claim of workflow revisions with the
observed design/outcome gap. No successful correction has been established.
Owner's pivot: the formal stages, repeated friction, engineering of the process,
and writing about activity displaced useful investigative progress. After seeing
that it was not working well, Omri paused development and chose hands-on Hack The
Box study to understand investigative structure and methodology himself before
continuing. Present this as a deliberate learning decision, not a completed fix
or evidence that the harness became effective. Do not invent an intervening
simplification attempt.
He said "CPDS" in the interview; the precise certification acronym was not
confirmed here. Public copy says "Hack The Box training" and makes no certification
completion, exam, or proficiency claim. Do not interpret "flags" in this account
as captured CTF flags or proven vulnerabilities; the intended point is friction.

## Runtime Radar Origin and Grouping: 2026-10-25

Owner account: a side project born while building Hachozeh. Growing numbers of
local frontend/backend services, ports, runners, and jobs became hard to track.
Tunnel setup and later deployment increased that operational context. The key
product decision was organizing runtime information by repository/project.
Current use, per owner: less frequent while not actively developing a project;
he returns to it to organize runtimes when doing project work. Describe use as
project-driven, not daily, abandoned, or proof of broader adoption. This statement
does not establish the maintenance status of his other projects.

Read-only source review in the Runtime Radar checkout confirmed:
- `Sources/RuntimeRadarCore/ProjectResolver.swift`: resolves known working paths
  using `git rev-parse --show-toplevel`; derives project name and subsystem.
- `Sources/RuntimeRadarCore/RuntimeDetector.swift`: links listening-port PIDs to
  tmux context where possible, uses the pane path for project inference, and
  supports labels/placement overrides. Not every process is automatically mapped.
- `Sources/RuntimeRadarCore/RuntimeSnapshot.swift`: combines services and workers
  into project groups with Git state; groups by project name, not a promise of
  globally unique repository identity across all checkout arrangements.
- README documents local listening-port discovery, loopback HTTP probes, tmux
  enrichment, offline labeled services, and shared CLI/menu-bar functionality.

Keep tunnel/deployment activity as motivation, not a feature claim. No remote
hosting, VPN health, or general scheduled-job monitoring was established by this
review. No Runtime Radar code changed or fresh runtime tests ran in this interview.

## Alon Porat Delivery Story: 2026-10-25

Owner account: the client's previous site had gone offline, and he wanted a modern
replacement. Omri purchased the domain, gathered preferences about colors,
practice areas, priorities, and sections, and owned the visual design and page
flow. He handled construction, technical/platform setup, deployment, and handover.
The client is a family member; public copy can focus on the practice's needs.
Retain coding-agent implementation credit.

Position this as straightforward end-to-end client delivery, not an artificially
complex architecture story. Do not invent the prior outage cause, recovery of the
old site, a CMS/admin handover, contractual support obligations, conversion metrics,
or paid engagement terms. "Platform setup" does not identify additional services.
Public copy captures the account; no client infrastructure was changed or newly
tested during this interview.

Owner review later the same day confirmed ongoing maintenance. Updated both
languages to emphasize translating client needs into site structure, content flow,
and design, owning delivery through launch, and continuing maintenance after
handover. No SLA or specific maintenance scope was supplied or claimed.

## Editorial Pass: 2026-10-25

Interview copy tightened in both languages without changing project order,
visual direction, screenshots, evidence dates, links, or the supplied PDF.
Ownership is established in the introduction; each project now names a specific
decision or delivery responsibility instead of repeating the general method.

- Hachozeh: phased architecture choices, loading-speed goal, smooth navigation.
- OSS Supporter: giving back through reusable, cross-workstation workflows.
- Security Research Harness: intended process, observed limitation, learning pivot;
  pause and ongoing study remain explicit, without an invented successful ending.
- Runtime Radar: project-first local visibility and use during active development.
- Alon Porat: requirements, visual direction, domain, setup, deployment, handover.
- Personal site: concise supporting example with upstream attribution retained.

Fixed a presentation omission: supporting projects' `role` fields existed but
were not rendered. They now show a short "My role" block and use the existing
details disclosure for technical context, matching the featured-project pattern.
Browser coverage checks every project's role and disclosure in both languages.
Release and provider/account gates below remain unchanged.

Verification after this pass: `pnpm run build` passed (0 Astro errors/warnings,
3 existing hints), `pnpm run check` passed, 37 unit/API tests passed, and all 38
browser tests passed. EN/HE checks cover visible role text, mouse/keyboard
disclosures, language/theme/menu behavior, search, metadata, images/PDF, and
320/390/768/1280px layouts in light/dark themes. Inspected desktop Runtime Radar
and mobile Hebrew Alon Porat / English research-harness screenshots. Browser
plugin/skill was not listed; used the existing Playwright suite. This is Chromium
coverage, not real-device Safari verification or a live provider test.
Screenshots: `/tmp/omribz-portfolio-review-2026-10-25/` (outside the repository).
Restarted the loopback-only tmux preview on port 4347; `/portfolio` returned 200.
The original checkout and the supplied PDF remain unchanged; no push/deploy.

## Compatibility Principle: 2026-10-25

Owner emphasizes responsive web layouts for phones, tablets (including iPads),
and desktops, plus portable non-web workflows. Added a bilingual "How I work"
paragraph describing this design principle with project-specific platform scope.
Responsive design is not a claim of WCAG conformance, all-browser testing, or
universal OS compatibility. Current local viewport tests are not real-device
iPad/Safari verification.

Checked public GitHub sources read-only:
- OSS Supporter README and `docs/adapters.md` explicitly describe Linux/macOS/
  Windows portability. Its playbook is Markdown; optional Python, GitHub CLI,
  and PowerShell helpers have prerequisites. Added Linux to the workflow copy,
  without claiming every helper was tested on all platforms in this session.
- Runtime Radar's public `Package.swift` still targets macOS 13+. Local source
  imports AppKit for the menu app and uses macOS tool paths in the detector.
  Keep Runtime Radar labeled macOS; no Windows/Linux port was established.

## Project Visuals: 2026-10-25

Added a visual for every project without changing the page structure or palette:

- Hachozeh: actual `systems/web/public/assets/brand/logo-tile.svg` from the local
  Navi repository, alongside the existing public-site screenshot.
- OSS Supporter: existing `assets/oss-supporter-banner.svg` from the project's
  public GitHub main branch. This is project artwork, not a product screenshot.
- Security Research Harness: generated transparent conceptual illustration of
  research tools and evidence inspection. Not an official logo or working UI.
  Source PNG retained; Astro serves a 288px WebP of about 16 KB.
- Runtime Radar: retained the existing actual application screenshot.
- Alon Porat: actual `public/assets/mark-gold.png` from the local APS repository,
  alongside the existing public-site screenshot.
- Personal site: reused the existing `/icon-192.png` identity mark.

Images have localized alt text, reserved dimensions, and lazy loading. Marks sit
beside project titles and scale down on mobile; screenshots retain their aspect
ratios. Browser tests now require an image for every project and verify each
symbol's localized alt text, in addition to successful image loading.

Verification: build passed (0 Astro errors/warnings, 3 existing hints), formatting
and lint passed, `git diff --check` passed, and 38 Chromium browser tests passed.
Layout coverage: EN/HE, light/dark, 320/390/768/1280px. Visually reviewed desktop
Hachozeh/OSS Supporter/research/site and mobile research/Hebrew Alon Porat captures.
Not real-device Safari verification. Local preview port 4347 returned 200.
Review screenshots are outside the repository under
`/Users/sirmacm/Projects/private-ops/omribz.me/portfolio-visuals-2026-10-25/`.
Original checkout left untouched; no push or deployment.

## Owner Copy and Readability Review: 2026-10-25

- English: action-led project roles (Led, Chose, Designed), less repeated "I";
  ownership and substantial agent implementation credit remain explicit.
- Hebrew: editorial pass across project stories, technical explanations, and
  contribution labels. Prefer natural Hebrew over literal technical translations.
  Harness name is exactly `רתמת מחקר אבט״מ לסוכנים`, as requested.
- Supporting text: captions, system-map descriptions, contribution notes, and
  evidence dates now use 14px text without faded opacity. Hebrew supporting text
  uses the existing Arial body-font stack; display headings retain site identity.
  Supporting labels and technology lists also have increased size/contrast.
- About page positioning stays unchanged until the owner supplies role-specific
  CVs. The eventual broader profile must reflect those sources, not inferred roles.
- Added browser assertions for the Hebrew project name and supporting-text size
  and opacity. Layout and content remain shared across languages.

Verification: build, formatting/lint, and diff checks passed; 38 Chromium browser
tests passed (34.5s), including EN/HE and 320/390/768/1280px in both themes.
Inspected local dark Hebrew system/contribution labels, mobile harness title,
expanded Hebrew technical copy, and English Alon section. Still local only.

## Status Layout and Working Method: 2026-10-25

Owner's second review (2026-10-25): removed the final public-source-snapshot
sentence from Hachozeh's detail in both languages; the source link and internal
provenance remain unchanged. Supporting projects now use the same full-width
status row above headings/visuals as featured projects, including Runtime Radar's
two-column layout. Browser layout checks assert that each status is above the
heading and every project image at all tested widths and in both languages.

Expanded "How I work" in both languages using the owner's supplied examples:
needs before technology, researched architecture decisions, agent collaboration
with human responsibility, repository-based continuity, the research-harness
learning pivot, and project-specific compatibility. No new achievements claimed.

Verification: build, formatting/lint and diff checks passed; all 38 Chromium
browser tests passed (35.9s). Reviewed dark Hebrew Runtime Radar status placement
and the expanded working-method section locally. No push or deployment.

## Ownership and Spacing Review: 2026-10-25

Owner clarified Hachozeh was his platform from the beginning, not an inherited
migration project. EN/HE role copy now starts with creation from scratch and
ownership of product direction/architecture; the Astro migration follows as one
phase. Existing coding-agent implementation credit remains unchanged.

Oracle / Horizon uses an explicit LTR bidi isolate within the RTL system map.
Supporting project headings now span the full width above the body; Runtime
Radar's text and screenshot align below that heading. Reduced stacked heading,
section, and link spacing, standardized supporting-project padding, and removed
the extra bottom margin after Alon's screenshot. No project or image reordered.
Browser regression checks cover the LTR label and 16px heading-to-body gap.
Build, formatting/lint and diff checks passed; 38 Chromium browser tests passed
(38.7s). Inspected desktop Runtime Radar/Alon and mobile Runtime Radar screenshots.
All edits remain local; no push or deployment.

## Image Viewer Fix: 2026-10-25

Owner reported raw image links leaving no in-page exit. Reviewed frames every
three seconds across the supplied 36-second screen recording: Hachozeh, Runtime
Radar, and Alon opened as raw images. Added a shared native dialog with localized
close control, Escape and backdrop dismissal, focus restoration, and page-scroll
locking. The portfolio URL and reading position remain unchanged.

Initial verification exposed Astro navigation following the link despite the
dialog opening. Image links now opt out of Astro routing (`data-astro-reload`),
and the delegated viewer listener handles clicks in the capture phase. Modified
clicks retain normal browser behavior; raw links remain a no-JavaScript fallback.
The listener works across language navigation; dialogs close before page swaps.

Also changed the Hebrew research summary's opening from `ניסיון` to `ניסוי`.
Manual in-app browser checks covered actual image opening, close button, Escape,
and clicking outside. Automated coverage includes all four linked images, focus,
URL/scroll preservation, keyboard opening, and operation after language switching.
No publication or provider configuration changes.
Final verification: build, formatting/lint and diff checks passed; 42 Chromium
desktop/mobile browser tests passed (45.5s). Screenshot of the open viewer:
`/tmp/omribz-image-viewer-proof.png`. Native Safari remains unverified.

## Before publication

### Unified project sequence trial: 2026-10-25

Owner approved trying one shared layout after reviewing the inconsistent
featured/supporting split. This supersedes the earlier two-column Runtime Radar
and smaller supporting-project layouts; visual approval is still pending.

- One renderer for all six projects, numbered 01-06; six matching index links.
- Same category/status row, h2 heading, description, optional media, role,
  optional evidence, technical disclosure, stack, and links.
- Removed the separate Tools & websites heading. Heading symbols are uniformly
  72px desktop / 64px mobile, with a shared minimum heading height even without
  a symbol. No special larger research illustration.
- Screenshots/banners follow descriptions, centered with natural proportions,
  capped at 400px high, never cropped. Full assets remain linked for inspection.
  Runtime Radar is no longer beside text; Alon's screenshot now precedes its role.
- Kept project order, copy, assets, and palette; evidence remains project-specific.

Verification: build, formatting/lint and diff checks passed; 38 Chromium browser
tests passed (39.1s), including shared headings, symbol dimensions, media order,
EN/HE and narrow/wide layouts. Also scrolled both complete pages in the in-app
browser, inspecting viewport screenshots including project boundaries, then
reviewed desktop Runtime Radar/Alon captures. No real-device Safari claim.
Review captures: `/tmp/omribz-unified-review/`. Still local, no push/deployment.

- User review of positioning, English/Hebrew copy, project order, and visual design.
- Confirm the existing September PDF is the version intended for public download.
  It remains in the local draft only, pending approval.
- Finish provider/account gates in security.md, then review the combined release.
- Repeat verification against the approved deployment and its actual metadata.

## Local preview

`http://127.0.0.1:4347/portfolio` and `/he/portfolio`.
tmux session: `omribz-portfolio`. Port 4321 remains available for other work.
The server runs the combined worktree and binds only to loopback; it is not a
public preview or a phone-accessible URL. No tunnel has been created.
Legacy PWA navigation caching is retired by the security changes.
Full desktop navigation starts at 768px so the added link does not crowd the brand.

Combined-draft verification: strict Astro check/build passed (0 errors/warnings,
3 existing hints). 38 browser tests passed: original security tests plus portfolio
EN/HE metadata, PDF/images, project expansion, search, theme/language/menu behavior,
and overflow checks at 320/390/768/1280px in both themes. The portfolio is included
in Pagefind. Sharing uses the existing site image with localized page metadata.

Content: `src/data/portfolio.ts`. Layout: `src/components/Portfolio.astro`.
