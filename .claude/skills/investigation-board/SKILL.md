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

Read `investigation_board/CLAUDE.md` for the full data model, architecture, and authoring guide.

The only file to edit is `investigation_board/src/data/boards.ts`. All visual components are built and reusable -- do NOT modify them unless the user explicitly asks for new features.

If you need logos not already in `media/`, use the `/media-logos` skill to fetch them.
