import { Sliders } from "@phosphor-icons/react";

interface ToolbarProps {
  onToggleGlobalSettings: () => void;
  globalSettingsOpen: boolean;
  variationCount: number;
}

export function Toolbar({ onToggleGlobalSettings, globalSettingsOpen, variationCount }: ToolbarProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-1 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
          <span className="text-white text-sm font-bold">B</span>
        </div>
        <h1 className="text-lg font-semibold text-text-primary tracking-tight">
          Bulk Ads
        </h1>
        <span className="text-xs text-text-tertiary bg-surface-3 px-2 py-0.5 rounded-full">
          {variationCount} variation{variationCount !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleGlobalSettings}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
            globalSettingsOpen
              ? "bg-accent text-white"
              : "bg-surface-2 text-text-secondary hover:text-text-primary hover:bg-surface-3"
          }`}
        >
          <Sliders size={16} />
          Palette & Font
        </button>
      </div>
    </header>
  );
}
