# Security and Release Runbook

## Boundaries

- Static Astro candidate: no signup form, application API, or subscriber database.
- Combined portfolio/security draft in the site-security worktree; preserve the original checkout. About/CV changes deferred.
- No commit, push, or deployment during the 2026-10-25 setup and simplification. Production still has the old signup endpoint until this release replaces it.
- Keep credentials, subscriber data, reports, and provider receipts outside this public repository. Local tests are not production proof.

Release authorization: owner requested production deployment on 2026-10-26.
The historical local-only status above is superseded by that approval; release
completion still requires CI and verification of the deployed revision.

## Email Updates

Bilingual email links open a draft addressed to the owner. Nothing is sent or subscribed until the visitor sends that email. Requests arrive in Gmail and are handled manually; privacy/removal details are linked beside the request link and in the footer.

- No Resend contact writes, confirmation tokens, automated sending, CAPTCHA, or Redis needed.
- Old subscription API routes and confirmation pages must return 404 after deployment, for GET and POST. Hiding the form alone is insufficient.
- Honor opt-outs before every mailing; retain only a minimal suppression record. Do not import old contacts as newly consenting subscribers. Use individual messages or BCC, never expose subscribers through To/CC.
- An owner-controlled provider test showed duplicate Resend contact creation can reactivate an opted-out contact. The fixture's opt-out was immediately restored; no email was sent. The automated flow was removed instead of adding a review queue.
- No application rate limiter is needed for a mailto link. Hosting traffic abuse is separate; no global traffic-rate limit has been verified.

## Provider State: 2026-10-25

### Verified Changes

- Resend sending-only domain `updates.omribz.me` verified in eu-west-1. Provider-supplied DKIM, SPF, return-path MX, and CNAME added in Cloudflare. Open/click tracking disabled. Retained for possible future use; the candidate does not send through it.
- Root DMARC monitoring published with `p=none` and reports to Cloudflare DMARC Management. Monitoring does not reject spoofed mail. Review legitimate senders before tightening policy.
- DNSSEC parent DS published; Google's resolver (8.8.8.8) returned the authenticated-data flag for the signed A answer at 23:30 local time. Cloudflare's resolver still returned cached answers without AD at that check. Do not disable signing while the parent DS exists.
- Existing root/www DNS-only A records and OpenAI verification preserved. Shared Vercel IP is not proof of a private-origin leak; no proxy toggle made.
- Vercel metadata reports SSO protection scoped to `all_except_custom_domains`. Verify an actual preview later; metadata is not an end-to-end check.
- Original Resend and Google verification variables exist in Production and Development, not Preview. Production-only newsletter variables were staged before simplification, with `NEWSLETTER_ENABLED=false`. Unused by this candidate, not deployed. Old code may ignore that flag.
- Private credentials remain outside Git with mode 0600. No Redis database, payment method, or paid upgrade added.

### Pending or Unused

- DNSSEC cache convergence: parent DS and Google validation confirmed; recheck other resolvers after their cached negative DS answers expire.
- Dedicated Managed Turnstile widget created for root/www, no pre-clearance; now unused. No Turnstile script or secret dependency remains in the candidate. Other projects' widgets untouched.
- Retire staged newsletter variables and unused widget after release. Do not revoke the old Resend key before the old deployment is replaced. Candidate only needs the public Google verification value.
- Vercel passkey protection observed; backup authenticator deferred to owner. Other provider MFA/recovery controls unverified.

## Content and Browser Policy

One post-publication rule applies to HTML, Markdown, OG images, archives, feeds, search, and sitemap: date reached, draft=false, unlisted=false. Rebuild when scheduled dates arrive. Unlisted is not secret-link access; public Git history remains public regardless of frontmatter.

Offline HTML caching is retired. The manifest remains; `sw.js` clears old Workbox caches and unregisters workers when they update. No navigation fallback converts missing routes into 200 responses. Unknown pages/posts/API paths must return real 404s.

Vercel headers restrict origins, deny objects/framing, and limit base/form targets. `scripts/secure-html.mjs` also inserts an enforced script CSP into generated HTML, with trusted inline-script hashes shared across the build for Astro navigation. No unsafe-inline or unsafe-eval in this script policy; wasm-unsafe-eval supports Pagefind. The outer header retains unsafe-inline because hashes are generated after Vercel reads config; both policies apply. Header-only scanners cannot assess this second layer. Always deploy `pnpm run build` output, not raw `astro build` output.

Inline event handlers fail the build. Embed shortcodes accept standalone text paragraphs, strict provider hosts/IDs, and DOM construction. Code examples stay inert. Twitter's script loads only with tweet blockquotes. Turnstile origins are no longer allowed.

## Verification and CI

Final local verification on 2026-10-25: 3 unit tests, publication-output checks,
42 desktop/mobile browser tests, formatting/lint, and production build passed.
Dependency audit returned no known vulnerabilities; candidate text-file Gitleaks
scan found no leaks. EN/HE links were browsed and mobile screenshots inspected.
Build retains three non-blocking type hints and an Astro Markdown deprecation
notice. Independent review's API-retirement test gap was addressed with a
source-level assertion. Live GET /api/subscribe still returned 405, confirming
that endpoint retirement has not yet reached production.

Run sequentially; publication tests rebuild the dist directory used by browser tests:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm run check
corepack pnpm test
corepack pnpm run test:publication
corepack pnpm run build
corepack pnpm exec playwright install chromium
corepack pnpm run test:browser
corepack pnpm audit --audit-level=low
git diff --check
```

Browser coverage includes bilingual email links/privacy, retired-route GET/POST 404s, CSP, search, embeds, menus, themes, service-worker retirement, responsive portfolio layout, and image-viewer dismissal. Visually inspect EN/HE mobile and desktop too.

Astro/Sharp and integrations updated; unused vulnerable prompt/frontmatter dependencies removed. Final audit also required Zod >=4.6.6, Undici >=8.12.2, and fast-uri >=3.1.9. Targeted pnpm overrides set security floors; revisit as upstream constraints move.

Prepared workflows add weekly dependency audits, Gitleaks, CodeQL, pinned Actions, dependency-update PRs, and six-hourly read-only site checks. They do not run until published/merged. Earlier checks reported dependency alerts, security-fix PRs, and protected main; recheck at release. Add security/CodeQL to required checks only after successful runs.

## Owner Account Checklist

Not claims of completion:

- Provider passkeys/MFA, offline recovery codes, spare recovery method, session/token review.
- Registrar transfer lock, auto-renew, current payment/recovery contact.
- DNSSEC validation; DMARC report review before enforcement.
- Actual preview authentication, no production secrets in previews/forks, usage/failure notifications and available spending limits.
- Failed Actions notifications and production 5xx monitoring.

## Release and Rollback

1. Obtain owner publication approval. Record current deployment ID, SHA, aliases, and environment scopes privately.
2. Review portfolio/security as distinct change groups; preserve unrelated checkout work.
3. Pass local checks and CI. Inspect an authenticated EN/HE preview, access protection, and email links without sending messages.
4. Deploy the approved revision. Run `node scripts/check-live.mjs https://omribz.me`. It expects retired subscription routes to return 404, so fails against the old deployment by design.
5. Verify GET/POST retirement, missing-path 404s, header and HTML CSP, portfolio/image viewer, search, language/theme, and email links on live aliases.
6. Clean unused newsletter variables/widget after successful release. Keep Google verification intact; check active deployment dependencies before revoking keys.
7. Roll back only to a verified safe revision. Older deployments contain the old signup handler: block that endpoint before restoring them, or deploy a corrected static revision. A staged disabled flag cannot protect old code that ignores it.

No production rollback rehearsal performed. Do not label this security release live until deployment and live checks succeed.
