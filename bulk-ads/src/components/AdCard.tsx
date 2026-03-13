import type { AdVariation, GlobalSettings } from "../types";

function getLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function getContrastColor(hex: string): string {
  return getLuminance(hex) > 0.5 ? "#1a1a1a" : "#ffffff";
}

function ensureReadable(textColor: string, bgColor: string): string {
  const ratio = Math.abs(getLuminance(textColor) - getLuminance(bgColor));
  return ratio < 0.15 ? getContrastColor(bgColor) : textColor;
}

interface AdCardProps {
  ad: AdVariation;
  globalSettings: GlobalSettings;
  isSelected: boolean;
  onSelect: () => void;
}

export function AdCard({ ad, globalSettings, isSelected, onSelect }: AdCardProps) {
  const { colorScheme, fontFamily } = globalSettings;
  const bgColor = colorScheme[ad.colorMapping[0]]?.color ?? "#333";
  const textColor = colorScheme[ad.colorMapping[1]]?.color ?? "#fff";
  const ctaBgColor = colorScheme[ad.colorMapping[2]]?.color ?? "#FF6B35";
  const ctaTextColor = colorScheme[ad.colorMapping[3]]?.color ?? "#fff";

  const autoTextColor = ensureReadable(textColor, bgColor);
  const autoCtaTextColor = ensureReadable(ctaTextColor, ctaBgColor);

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
        isSelected
          ? "ring-2 ring-accent ring-offset-2 ring-offset-surface-0 scale-[1.02]"
          : "hover:scale-[1.01] hover:shadow-lg"
      }`}
    >
      <div
        className="aspect-[4/5] p-6 flex flex-col justify-between"
        style={{ backgroundColor: bgColor, fontFamily }}
      >
        <div>
          {ad.showLogo && (
            <div
              className="w-8 h-8 rounded-full mb-6 flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: ctaBgColor, color: autoCtaTextColor }}
            >
              Ad
            </div>
          )}
          <h3
            className="text-2xl font-bold leading-tight mb-2"
            style={{ color: autoTextColor }}
          >
            {ad.headline}
          </h3>
          <p
            className="text-sm leading-relaxed opacity-80"
            style={{ color: autoTextColor }}
          >
            {ad.subtext}
          </p>
        </div>

        <div>
          <span
            className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: ctaBgColor, color: autoCtaTextColor }}
          >
            {ad.ctaText}
          </span>
        </div>
      </div>
    </div>
  );
}
