# Tony Tech Solutions project instructions

## Purpose and verified stack

This repository contains the Tony Tech Solutions (TTS) bilingual company website for AI, software, CAD/CAM, and digital transformation services. It is a Vite-powered React single-page application using React Router for client-side routes and i18next/react-i18next for English and Vietnamese. The installed direct dependencies are React, React DOM, Vite, React Router, i18next, react-i18next, and i18next-browser-languagedetector.

Treat the existing implementation as the source of truth. Preserve its architecture and visual identity unless a requested change explicitly calls for something different.

## Architecture

- `index.html` is the Vite HTML entry; `src/main.jsx` imports global CSS and i18n, mounts the React app, and defines the shared shell and routes.
- `src/components/` contains the shared `Header` and `Footer`.
- `src/pages/` contains the `/`, `/about`, `/services`, `/news`, `/work`, `/work/:slug`, and `/contact` route components. Some shared page sections and helpers are currently exported from `Home.jsx` and `About.jsx`; reuse them where appropriate instead of duplicating behavior or relocating code without a clear need.
- `src/data/projects.js` holds CMS-ready project identifiers, categories, and presentation metadata separately from the Work page; translated project copy remains in the i18n dictionaries.
- `src/i18n/index.js` configures English and Vietnamese resources, language detection, fallback to English, and localStorage caching. Translation dictionaries are `src/i18n/en.json` and `src/i18n/vi.json`.
- `src/styles.css` is the centralized stylesheet. No separate asset directory, Vite config, or environment configuration is currently tracked.

## Commands and verification

Available npm scripts:

- `npm run dev` — start the Vite development server.
- `npm run build` — create the production build in `dist/`.
- `npm run preview` — preview the production build locally.

There are no test or lint scripts configured in `package.json`. Do not claim tests or lint checks were run unless suitable tooling is added and used. For code changes, inspect affected imports and routes, keep the change focused, and run the production build when practical. Review the Git diff and status before finishing.

## Styling and design

- Retain the current clean, professional B2B technology design: navy and blue accents, pale neutral backgrounds, thin borders, restrained hover motion, and geometric CSS decoration.
- Reuse the existing CSS variables (`--navy`, `--blue`, `--light`, `--muted`, `--line`, `--white`), Manrope and DM Mono typography, and established classes/components.
- Keep styling in `src/styles.css` unless there is a clear architectural reason to change that pattern. Avoid unrelated redesigns, duplicate rules, and unnecessary dependencies.
- Responsive CSS currently has breakpoints at `max-width: 900px` and `max-width: 600px`. The service grid changes from four to two columns at 900px and to one at 600px; other grids also collapse at the smaller breakpoint. The header navigation wraps rather than switching to a separate menu. Preserve and check these behaviors when editing layout.
- Preserve semantic HTML and keyboard usability. Ensure newly added interactive elements have accessible names and visible keyboard focus; the existing stylesheet currently has focus styling for contact form fields.

## Translations and content

- Put user-facing text in the existing i18next dictionaries rather than hardcoding translated copy in components.
- Whenever user-facing text or a translation structure changes, update both `en.json` and `vi.json` with matching keys and compatible object/array shapes. The current files have matching translation keys.
- Continue using the existing `useTranslation()`/`t()` pattern and configured language switcher. Do not add another translation mechanism.

## Component organization and behavior

- Reuse the existing header, footer, page hero, CTA, section heading, service card, and article card implementations where suitable.
- Keep route changes in `src/main.jsx` and follow existing React Router patterns.
- Preserve existing behavior unless the task requests a change. The contact form hands off a prefilled inquiry to WhatsApp but does not itself deliver messages or confirm receipt. The news category buttons/read-article affordance do not currently implement filtering or navigation; do not represent these as working features or silently change their behavior.

## Safe workflow and Git

- Inspect the relevant existing files and surrounding usage before editing. Make the smallest complete change that meets the request and avoid unrelated refactoring.
- Check imports, translations, routes, responsive behavior, and accessibility affected by the change. Run only verification commands that exist and report their actual results and limitations.
- Do not commit or push, reset, force-push, delete branches, or rewrite Git history unless explicitly instructed. Preserve existing work and never expose or commit secrets. `.gitignore` excludes `.env` and `.env.*` while allowing `.env.example`; keep secret values out of tracked files.
