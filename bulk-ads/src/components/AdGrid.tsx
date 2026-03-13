import type { AdVariation, GlobalSettings } from "../types";
import { AdCard } from "./AdCard";

interface AdGridProps {
  variations: AdVariation[];
  globalSettings: GlobalSettings;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AdGrid({ variations, globalSettings, selectedId, onSelect }: AdGridProps) {
  if (variations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-tertiary">
        <p>No variations defined in <code className="text-text-secondary bg-surface-2 px-1.5 py-0.5 rounded text-xs">seed-ads.ts</code></p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {variations.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
            globalSettings={globalSettings}
            isSelected={ad.id === selectedId}
            onSelect={() => onSelect(ad.id)}
          />
        ))}
      </div>
    </div>
  );
}
