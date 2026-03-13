import type { ColorWeight } from "../types";

interface ColorSchemeEditorProps {
  colorScheme: ColorWeight[];
  onUpdateColor: (index: number, color: string) => void;
  onUpdateWeight: (index: number, weight: number) => void;
}

export function ColorSchemeEditor({ colorScheme, onUpdateColor, onUpdateWeight }: ColorSchemeEditorProps) {
  const totalWeight = colorScheme.reduce((sum, c) => sum + c.weight, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
          Color Scheme
        </label>
        <span className={`text-xs ${Math.abs(totalWeight - 100) > 5 ? "text-danger" : "text-text-tertiary"}`}>
          {totalWeight}%
        </span>
      </div>

      {/* Preview bar */}
      <div className="flex h-6 rounded-lg overflow-hidden">
        {colorScheme.map((c, i) => (
          <div
            key={i}
            style={{ backgroundColor: c.color, width: `${c.weight}%` }}
            className="transition-all duration-200"
          />
        ))}
      </div>

      {/* Color inputs */}
      <div className="space-y-3">
        {colorScheme.map((c, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              type="color"
              value={c.color}
              onChange={(e) => onUpdateColor(i, e.target.value)}
              className="w-8 h-8 rounded-md cursor-pointer shrink-0"
            />
            <input
              type="text"
              value={c.color}
              onChange={(e) => onUpdateColor(i, e.target.value)}
              className="w-20 bg-surface-2 border border-border rounded px-2 py-1 text-xs text-text-primary font-mono"
            />
            <input
              type="range"
              min={0}
              max={100}
              value={c.weight}
              onChange={(e) => onUpdateWeight(i, parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-xs text-text-tertiary w-8 text-right tabular-nums">
              {c.weight}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
