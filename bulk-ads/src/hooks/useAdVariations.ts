import { useState, useCallback } from "react";
import type { AdVariation } from "../types";
import { seedAds } from "../data/seed-ads";

export function useAdVariations() {
  const [variations] = useState<AdVariation[]>(seedAds);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = variations.find((v) => v.id === selectedId) ?? null;

  const updateVariation = useCallback((_id: string, _updates: Partial<AdVariation>) => {
    // Variations are authored in seed-ads.ts by Claude Code.
    // This is a no-op placeholder for the editor panel's live tweaking.
  }, []);

  const selectVariation = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  return {
    variations,
    selected,
    selectedId,
    updateVariation,
    selectVariation,
  };
}
