# UI Shell Integration Guide (Folo-inspired)

## Overview
- **Strategy:** UI Layer Transplant — existing Huntly routes and data flows stay intact while the presentation layer is reskinned to mirror the Folo desktop experience.
- **Scope:** Web client (`app/client`) only. Backend, extension, and Tauri runtimes are untouched.
- **Key additions:**
  - Folo theme tokens and glassmorphism surfaces (`src/styles/folo-shell.css`).
  - Shell/layout wiring (`components/Layout.tsx`, `components/Header.tsx`, `components/Sidebar/*`, `components/SubHeader.tsx`).
  - Card and list polish (`components/MagazineItem.tsx`, `components/PageList.tsx`).

## How to run (web client)
- **Dev:**
  ```bash
  cd app/client
  yarn install
  yarn start
  ```
- **Production build:**
  ```bash
  cd app/client
  yarn build
  ```
- **API:** No changes to API clients — existing `PageControllerApiFactory`, `SearchControllerApiFactory`, etc., continue to operate as before.

## Parity checklist
- [x] `/` Recently Read list with mark-read controls and infinite scroll.
- [x] `/list` saved library feed with sort/filter controls.
- [x] `/starred`, `/later`, `/archive` library states preserved.
- [x] `/page/:id` full detail view + modal detail from list/search pages.
- [x] `/connector/:id` and `/folder/:id` connector/folder scoped feeds.
- [x] `/feeds` aggregated feed listing.
- [x] `/twitter` tweet/thread layout and actions.
- [x] `/search` advanced search chips, recent queries, infinite results, detail modal.
- [x] `/highlights` highlight cards with delete + page deep-linking.
- [x] Settings modal (connectors/feeds/general) reachable from header and sidebar actions.

## Visual cues (for reviewers)
- Glassy header with centered search bar and pill actions; brand pill uses Folo accent/warm gradient.
- Sidebar is a frosted card with section headers and pill counts; nav items slide subtly on hover and highlight with accent gradients.
- Sub-header actions sit in a rounded surface; action buttons use light borders and accent hover states.
- Page cards use rounded glass panels, subtle borders, and accent borders when active/selected.

## Extending/adjusting
- Theme variables live in `src/styles/folo-shell.css` (`--fo-*`). Tweaking them updates the shell globally.
- Shared utility classes: `folo-panel`, `folo-topbar`, `folo-nav-item*`, `folo-page-card`, `folo-icon-btn`, `folo-sticky-panel`.
- Keep routes and API contracts unchanged; new UI elements should wrap existing components rather than replace logic.
