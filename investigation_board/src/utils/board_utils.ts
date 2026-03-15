import { boards } from "../data/boards";
import type { Board } from "../types";

export function getAllBoards(): Board[] {
  return boards;
}

export function getBoardBySlug(slug: string | undefined): Board | undefined {
  return boards.find((b) => b.slug === slug);
}
