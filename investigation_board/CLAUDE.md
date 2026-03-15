# investigation_board

## Overview
Corkboard-style investigation board for visualizing relationship networks. React + Vite + TypeScript frontend. Boards are authored by editing `src/data/boards.ts`.

## Commands
- `bun install` - install dependencies
- `bun run dev` - start dev server
- `bun run build` - production build

## How to add/edit boards
Edit `src/data/boards.ts` - append a new `Board` entry to the array. See `src/types.ts` for the `BoardNode`, `BoardEdge`, and `Board` interfaces. See `src/data/boards.ts` for a working example.

Key points:
- Node `x`/`y` are 0-100 percentages of the board area; keep nodes 15+ units apart
- Images served via symlink `public/media -> ../../media` (e.g. `/media/Technology/company/openai.png`). For missing logos use `/media-logos` skill or browse `media/` directory
- Mix `display` styles (`"photo"`, `"polaroid"`, `"postit"`, `"clipping"`) across nodes for visual variety

## Architecture
- `src/types.ts` - data model interfaces
- `src/data/boards.ts` - board definitions (**only file to edit**)
- `src/components/` - reusable UI (NodeCard, ConnectionLine, PinIcon, BoardView, BoardIndex, BoardHeader)

**Do NOT modify components** unless the user explicitly asks for new features.

## Tech Stack
React 19, Vite 8, TypeScript, Tailwind CSS v4, react-router-dom v7, @phosphor-icons/react, bun (NOT npm).
