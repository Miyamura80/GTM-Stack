const FONT_OPTIONS = [
  "Inter",
  "Space Grotesk",
  "DM Sans",
  "Sora",
  "Outfit",
  "Playfair Display",
];

interface FontSelectProps {
  value: string;
  onChange: (font: string) => void;
}

export function FontSelect({ value, onChange }: FontSelectProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
        Font Family
      </label>
      <div className="space-y-1">
        {FONT_OPTIONS.map((font) => (
          <button
            key={font}
            onClick={() => onChange(font)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
              value === font
                ? "bg-accent/15 text-accent border border-accent/30"
                : "bg-surface-2 text-text-secondary hover:text-text-primary hover:bg-surface-3 border border-transparent"
            }`}
            style={{ fontFamily: font }}
          >
            {font}
          </button>
        ))}
      </div>
    </div>
  );
}
