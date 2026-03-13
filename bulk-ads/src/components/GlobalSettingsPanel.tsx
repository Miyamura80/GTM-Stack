import { X } from "@phosphor-icons/react";
import type { GlobalSettings } from "../types";
import { ColorSchemeEditor } from "./ColorSchemeEditor";
import { FontSelect } from "./FontSelect";

interface GlobalSettingsPanelProps {
  settings: GlobalSettings;
  onUpdateColor: (index: number, color: string) => void;
  onUpdateWeight: (index: number, weight: number) => void;
  onUpdateFont: (font: string) => void;
  onClose: () => void;
}

export function GlobalSettingsPanel({
  settings,
  onUpdateColor,
  onUpdateWeight,
  onUpdateFont,
  onClose,
}: GlobalSettingsPanelProps) {
  return (
    <div className="w-[380px] shrink-0 bg-surface-1 border-l border-border overflow-y-auto">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-text-primary">Global Settings</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-3 transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-5 space-y-6">
        <ColorSchemeEditor
          colorScheme={settings.colorScheme}
          onUpdateColor={onUpdateColor}
          onUpdateWeight={onUpdateWeight}
        />
        <div className="border-t border-border pt-5">
          <FontSelect value={settings.fontFamily} onChange={onUpdateFont} />
        </div>
      </div>
    </div>
  );
}
