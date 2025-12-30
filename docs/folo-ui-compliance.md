# Folo-dev UI Notice & Compliance

- **Upstream reference:** Folo-dev (AGPL-3.0) desktop web shell (structure seen in `apps/ssr`, `packages/configs/tailwindcss/web.ts`).
- **Reuse scope:** Visual style only. We re-created layout, navigation patterns, and theme tokens in `app/client/src/styles/folo-shell.css` and updated shell components to mirror the Folo desktop look. No upstream business logic or data access code was copied.
- **Third-party assets:** Font stack references **SN Pro** for stylistic parity (fallbacks to SF Pro/Inter/Segoe). If you want the exact face, add `@fontsource/sn-pro` during your own build. Icons remain from MUI/icon sets already in the project.

## Compliance notes
- This project already carries the original LICENSE (MIT). The new UI shell is inspired by an AGPL-3.0 work; keep this notice and the upstream reference when distributing builds that include the Folo-inspired shell.
- If further upstream Folo code is imported in the future, ensure full AGPL-3.0 obligations are met (source availability for derivative works, preservation of notices, and attribution in distributed binaries).
- Existing API surface and backend remain unchanged; the Folo-inspired assets are constrained to frontend presentation.
