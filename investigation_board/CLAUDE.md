# investigation_board

## Overview
Corkboard-style investigation board for visualizing relationship networks between companies, people, and products. React + Vite + TypeScript frontend. Boards are authored by editing `src/data/boards.ts`.

## Commands
- `bun install` - install dependencies
- `bun run dev` - start dev server (localhost:5173)
- `bun run build` - production build
- `bun run preview` - preview production build

## How to add/edit boards
Edit `src/data/boards.ts` - add entries to the `boards` array. Each board has:
- `slug` - URL-friendly identifier
- `title`, `description` - display metadata
- `nodes[]` - positioned cards with `{ id, label, image, type, x, y }` (x/y are 0-100 percentages)
- `edges[]` - connections with `{ id, from, to, label?, color?, style? }`

Node types: `"company"`, `"person"`, `"product"`, `"open-source"` (each gets a distinct accent color).

## Image paths
Images reference `/media/...` served via symlink `public/media -> ../../media`. Use paths like `/media/Technology/company/openai.png`.

## Tech Stack
- React 19 + Vite 8 + TypeScript
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- react-router-dom v7 for multi-board navigation
- @phosphor-icons/react for icons
- bun as package manager (NOT npm)
- Google Font "Special Elite" for title typography

## Architecture
- `src/types.ts` - BoardNode, BoardEdge, Board interfaces
- `src/data/boards.ts` - Board definitions (primary authoring file)
- `src/components/BoardIndex.tsx` - Home page grid of board cards
- `src/components/BoardView.tsx` - Corkboard with SVG overlay + positioned nodes
- `src/components/NodeCard.tsx` - Pinned card with logo, label, pushpin
- `src/components/ConnectionLine.tsx` - SVG bezier curve connections
- `src/components/PinIcon.tsx` - Pushpin SVG decoration
- `src/components/BoardHeader.tsx` - Title bar with back navigation
- `src/hooks/useBoard.ts` - Load single board by slug
- `src/hooks/useBoards.ts` - Load board index

## Code Style
- Functional React components with TypeScript
- Tailwind utility classes for styling
- snake_case for files, CamelCase for components
