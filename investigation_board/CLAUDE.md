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
- `slug` - URL-friendly identifier (used in URL: `/board/<slug>`)
- `title`, `description` - display metadata
- `nodes[]` - positioned cards with `{ id, label, image, type, x, y }` (x/y are 0-100 percentages)
- `edges[]` - connections with `{ id, from, to, label?, color?, style? }`

### Node data model
```typescript
{
  id: "unique-id",
  label: "Display Name",
  image: "/media/Technology/company/openai.png",
  type: "company",          // "company" | "person" | "product" | "open-source"
  x: 25, y: 40,             // position 0-100 (percentage of board)
  subtitle?: "Optional",
  note?: "Hover tooltip",
  display?: "photo",        // "photo" | "polaroid" | "postit" | "clipping"
}
```

### Edge data model
```typescript
{
  id: "from-to",
  from: "node-id-1",
  to: "node-id-2",
  label?: "relationship",
  color?: "#b91c1c",        // default: red
  style?: "solid",          // "solid" | "dashed"
}
```

### Display styles
Mix across nodes for visual variety:
- `"photo"` - Clean white-bordered print (default)
- `"polaroid"` - Wide bottom border, typewriter font labels
- `"postit"` - Colored sticky note with folded corner
- `"clipping"` - Aged newspaper clipping with torn edges

### Node type accent colors
- `"company"` blue, `"product"` green, `"person"` amber, `"open-source"` purple

### Layout tips
- Keep nodes at least 15 units apart to avoid overlap
- Edges automatically curve with natural sag
- Place related nodes near each other for cleaner string paths
- Vary `display` styles to avoid visual monotony

## Image paths
Images served via symlink `public/media -> ../../media`. Use paths like `/media/Technology/company/openai.png`.

Available assets:
```
/media/Technology/company/       okta.png, openai.png
/media/Technology/agents/        ChatGPT Logo.png, Claude Code AI Logo.jpg, claude.png, claude_code.webp, cursor.jpeg, vscode.png
/media/Technology/b2b products/  Edison_logo.png, entra.png, okta.png, salesforce.png, snowflake.png, splunk.png
/media/Technology/b2c products/  gdrive.png, gemini.png, outlook.svg, replit.png
/media/Technology/open-source/   postgres.svg
```

For missing logos, use the `/media-logos` skill or add images to `media/` manually.

## Tech Stack
- React 19 + Vite 8 + TypeScript
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- react-router-dom v7 for multi-board navigation
- @phosphor-icons/react for icons
- bun as package manager (NOT npm)
- Google Font "Special Elite" for title typography

## Architecture
- `src/types.ts` - BoardNode, BoardEdge, Board interfaces
- `src/data/boards.ts` - Board definitions (**primary authoring file**)
- `src/components/BoardIndex.tsx` - Home page grid of board cards
- `src/components/BoardView.tsx` - Corkboard with SVG overlay + positioned nodes
- `src/components/NodeCard.tsx` - Pinned card with 4 display styles
- `src/components/ConnectionLine.tsx` - Red string bezier curve connections
- `src/components/PinIcon.tsx` - 3D pushpin SVG decoration
- `src/components/BoardHeader.tsx` - Title bar with back navigation
- `src/hooks/useBoard.ts` - Load single board by slug
- `src/hooks/useBoards.ts` - Load board index

**Do NOT modify components** unless the user explicitly asks for new features. Only edit `src/data/boards.ts` to add/modify boards.

## Code Style
- Functional React components with TypeScript
- Tailwind utility classes for styling
- snake_case for files, CamelCase for components
