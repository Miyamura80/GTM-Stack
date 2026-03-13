import { useState, useCallback } from "react";
import type { GlobalSettings, ColorWeight } from "../types";
import { defaultGlobalSettings } from "../data/seed-ads";

export function useGlobalSettings() {
  const [settings, setSettings] = useState<GlobalSettings>(defaultGlobalSettings);

  const updateColor = useCallback((index: number, color: string) => {
    setSettings((prev) => ({
      ...prev,
      colorScheme: prev.colorScheme.map((c, i) =>
        i === index ? { ...c, color } : c
      ),
    }));
  }, []);

  const updateWeight = useCallback((index: number, weight: number) => {
    setSettings((prev) => ({
      ...prev,
      colorScheme: prev.colorScheme.map((c, i) =>
        i === index ? { ...c, weight } : c
      ),
    }));
  }, []);

  const updateColorScheme = useCallback((colorScheme: ColorWeight[]) => {
    setSettings((prev) => ({ ...prev, colorScheme }));
  }, []);

  const updateFont = useCallback((fontFamily: string) => {
    setSettings((prev) => ({ ...prev, fontFamily }));
  }, []);

  return {
    settings,
    updateColor,
    updateWeight,
    updateColorScheme,
    updateFont,
  };
}
