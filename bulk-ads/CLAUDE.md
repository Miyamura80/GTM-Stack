# bulk-ads

## Overview
Bulk ad variation preview canvas. React + Vite + TypeScript frontend that renders ad variations defined in code. Claude Code authors new variations by editing `src/data/seed-ads.ts`.

## Commands
- `bun install` — install dependencies
- `bun run dev` — start dev server (localhost:5173)
- `bun run build` — production build
- `bun run preview` — preview production build

## How to add ad variations
Edit `src/data/seed-ads.ts` — add entries to the `seedAds` array. Each variation has:
- `id` — unique string
- `headline`, `subtext`, `ctaText` — ad copy
- `showLogo` — boolean
- `colorMapping` — array of 4 indices `[bg, text, ctaBg, ctaText]` into the global `colorScheme`

The global color scheme (4 colors with weights) and font are also defined in `seed-ads.ts` as `defaultGlobalSettings`.

## Tech Stack
- React + Vite + TypeScript
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- @phosphor-icons/react for icons
- bun as package manager (NOT npm)

## Architecture
- `src/types.ts` — AdVariation, ColorWeight, GlobalSettings interfaces
- `src/data/seed-ads.ts` — Ad variations + global palette/font (primary authoring file)
- `src/components/AdCard.tsx` — Visual ad preview card with auto-contrast
- `src/components/AdGrid.tsx` — Responsive grid layout
- `src/components/Toolbar.tsx` — Top bar with variation count + palette toggle
- `src/components/GlobalSettingsPanel.tsx` — Live palette/font tweaking
- `src/hooks/useAdVariations.ts` — Reads seed data into state
- `src/hooks/useGlobalSettings.ts` — Global color scheme + font state

## Code Style
- Functional React components with TypeScript
- Tailwind utility classes for layout/chrome
- Inline styles for dynamic user-controlled values (colors, fonts)
- snake_case for files, CamelCase for components
