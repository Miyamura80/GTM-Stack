import { boards } from "../data/boards";
import type { Board } from "../types";

export function useBoard(slug: string | undefined): Board | undefined {
  return boards.find((b) => b.slug === slug);
}
