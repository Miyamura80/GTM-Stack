import { X } from "@phosphor-icons/react";
import type { AdVariation } from "../types";

interface EditorPanelProps {
  ad: AdVariation;
  onUpdate: (id: string, updates: Partial<AdVariation>) => void;
  onClose: () => void;
}

export function EditorPanel({ ad, onUpdate, onClose }: EditorPanelProps) {
  return (
    <div className="w-[380px] shrink-0 bg-surface-1 border-l border-border overflow-y-auto">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-text-primary">Edit Variation</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-3 transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-5 space-y-5">
        <Field
          label="Headline"
          value={ad.headline}
          onChange={(v) => onUpdate(ad.id, { headline: v })}
        />
        <Field
          label="Subtext"
          value={ad.subtext}
          onChange={(v) => onUpdate(ad.id, { subtext: v })}
          multiline
        />
        <Field
          label="CTA Text"
          value={ad.ctaText}
          onChange={(v) => onUpdate(ad.id, { ctaText: v })}
        />

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
            Show Logo
          </label>
          <button
            onClick={() => onUpdate(ad.id, { showLogo: !ad.showLogo })}
            className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
              ad.showLogo ? "bg-accent" : "bg-surface-3"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                ad.showLogo ? "left-5.5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
            Color Mapping
          </label>
          <p className="text-xs text-text-tertiary mb-3">
            Reorder how global colors map to this card's elements.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {["Background", "Text", "CTA Bg", "CTA Text"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-xs text-text-tertiary w-14">{label}</span>
                <select
                  value={ad.colorMapping[i]}
                  onChange={(e) => {
                    const newMapping = [...ad.colorMapping];
                    newMapping[i] = parseInt(e.target.value);
                    onUpdate(ad.id, { colorMapping: newMapping });
                  }}
                  className="flex-1 bg-surface-2 border border-border rounded px-2 py-1 text-xs text-text-primary"
                >
                  {[0, 1, 2, 3].map((idx) => (
                    <option key={idx} value={idx}>Slot {idx + 1}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const className =
    "w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent transition-colors";

  return (
    <div>
      <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={`${className} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
      )}
    </div>
  );
}
