---
name: investigation-board
description: Create or edit corkboard-style investigation boards that visualize relationship networks between companies, people, and products. Use when the user wants to map out connections, create relationship diagrams, or build visual investigation boards.
user_invocable: true
triggers:
  - /investigation-board
  - create an investigation board
  - make a corkboard
  - map out relationships
  - visualize connections between
  - relationship diagram
---

# Investigation Board Skill

Create and edit detective-style corkboard visualizations showing relationship networks. The app lives at `investigation_board/` in the repo root.

## How It Works

The entire board is authored by editing **one file**: `investigation_board/src/data/boards.ts`. All visual components (pins, red strings, card styles) are already built and reusable. You just define the data.

## Quick Start

To **add a new board**, append an entry to the `boards` array in `investigation_board/src/data/boards.ts`:

```typescript
import type { Board } from "../types";

export const boards: Board[] = [
  // ... existing boards ...
  {
    slug: "my-board-slug",        // URL path: /board/my-board-slug
    title: "My Board Title",
    description: "Short description shown on index card",
    nodes: [ /* ... */ ],
    edges: [ /* ... */ ],
  },
];
```

## Data Model

### Nodes (pinned cards on the board)

```typescript
{
  id: "unique-id",               // unique within the board
  label: "Display Name",
  image: "/media/Technology/company/openai.png",  // path under public/media symlink
  type: "company",               // "company" | "person" | "product" | "open-source"
  x: 25,                         // horizontal position 0-100 (percentage)
  y: 40,                         // vertical position 0-100 (percentage)
  subtitle?: "Optional subtitle",
  note?: "Hover tooltip text",
  display?: "photo",             // card visual style (see below)
}
```

### Edges (red string connections)

```typescript
{
  id: "from-to",                 // unique edge ID
  from: "node-id-1",             // source node ID
  to: "node-id-2",               // target node ID
  label?: "relationship",        // text label shown on the string
  color?: "#b91c1c",             // string color (default: red)
  style?: "solid",               // "solid" (default) | "dashed"
}
```

## Display Styles

Mix these across nodes for visual variety. Set via `display` field:

| Style        | Look                                               | Best for              |
|-------------|-----------------------------------------------------|-----------------------|
| `"photo"`    | Clean white-bordered print                         | Products, default     |
| `"polaroid"` | Wide bottom border, typewriter font labels         | Key companies/people  |
| `"postit"`   | Colored sticky note (random color), folded corner  | Supporting items      |
| `"clipping"` | Aged newspaper clipping with torn edges            | Context/background    |

## Node Types & Colors

Each type gets a distinct accent color on the card:
- `"company"` - blue accent
- `"product"` - green accent
- `"person"` - amber accent
- `"open-source"` - purple accent

## Layout Tips

- `x` and `y` are percentages (0-100) of the board area
- Keep nodes at least 15 units apart to avoid overlap
- Edges automatically curve with natural sag between connected nodes
- Place related nodes near each other for cleaner string paths
- Vary `display` styles to avoid visual monotony

## Available Media Assets

Images are served via symlink `public/media -> ../../media`. Current assets:

```
/media/Technology/company/       okta.png, openai.png
/media/Technology/agents/        ChatGPT Logo.png, Claude Code AI Logo.jpg, claude.png, claude_code.webp, cursor.jpeg, vscode.png
/media/Technology/b2b products/  Edison_logo.png, entra.png, okta.png, salesforce.png, snowflake.png, splunk.png
/media/Technology/b2c products/  gdrive.png, gemini.png, outlook.svg, replit.png
/media/Technology/open-source/   postgres.svg
```

If you need logos not listed above, use the `/media-logos` skill to fetch them from logo.dev, or add images to the `media/` directory manually.

## Running the App

```bash
cd investigation_board && bun install && bun run dev
```

Opens at http://localhost:5173 (or next available port). The home page shows all boards as clickable case-file cards; each board opens its corkboard view.

## Do NOT Modify

These components are already built and should be reused as-is:
- `src/components/NodeCard.tsx` - all 4 display styles
- `src/components/ConnectionLine.tsx` - red string bezier curves
- `src/components/PinIcon.tsx` - 3D pushpin
- `src/components/BoardView.tsx` - corkboard layout with SVG overlay
- `src/components/BoardIndex.tsx` - home page grid
- `src/components/BoardHeader.tsx` - title bar with back nav
- `src/hooks/useBoard.ts`, `src/hooks/useBoards.ts` - data loading

Only edit `src/data/boards.ts` to add/modify boards. Only modify components if the user explicitly asks for new features or styles.
