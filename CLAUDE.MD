# CLAUDE.MD

See [AGENTS.md](./AGENTS.md) for the active collaboration style and project guardrails.

This repository is the source for [omribz.me](https://omribz.me), forked from `steipete/steipete.me`.

Current product shape:

- profile-first personal site
- blog-ready, but allowed to be empty
- bilingual: English default, Hebrew under `/he`
- no invented posts or filler content
- keep attribution to upstream

For bilingual content:

- create real localized routes, not JS-swapped text
- English posts use `lang: "en"`
- Hebrew posts use `lang: "he"`
- paired posts should share `translationKey`

Do not publish local source-context files unless explicitly requested:

- CV PDFs
- raw profile photo
- notes/social source files
