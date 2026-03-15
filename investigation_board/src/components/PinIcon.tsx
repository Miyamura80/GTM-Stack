interface PinIconProps {
  color?: string;
  size?: number;
}

/**
 * Realistic 3D pushpin with metallic sheen, shadow, and needle.
 * Reusable across any investigation board.
 */
export function PinIcon({ color = "#dc2626", size = 28 }: PinIconProps) {
  // Unique gradient IDs per color to avoid SVG conflicts
  const uid = color.replace("#", "p");

  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 28 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.35))" }}
    >
      {/* Needle shadow */}
      <ellipse cx="14" cy="34" rx="3" ry="1.2" fill="rgba(0,0,0,0.15)" />

      {/* Needle */}
      <line
        x1="14"
        y1="16"
        x2="14"
        y2="33"
        stroke="#888"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="14"
        y1="30"
        x2="14"
        y2="34"
        stroke="#aaa"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* Pin collar (metal ring) */}
      <ellipse cx="14" cy="15" rx="4" ry="2" fill="#999" />
      <ellipse cx="14" cy="14.5" rx="3.5" ry="1.5" fill="#bbb" />

      {/* Pin head - main dome */}
      <circle cx="14" cy="10" r="9" fill={color} />

      {/* Dome gradient overlay for 3D effect */}
      <circle cx="14" cy="10" r="9" fill={`url(#${uid}_dome)`} />

      {/* Glossy highlight */}
      <ellipse cx="11" cy="7" rx="4" ry="3" fill={`url(#${uid}_gloss)`} />

      {/* Rim shadow */}
      <circle
        cx="14"
        cy="10"
        r="8.5"
        fill="none"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="1"
      />

      <defs>
        <radialGradient id={`${uid}_dome`} cx="0.4" cy="0.35" r="0.6">
          <stop offset="0%" stopColor="white" stopOpacity="0.25" />
          <stop offset="60%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id={`${uid}_gloss`} cx="0.5" cy="0.4" r="0.5">
          <stop offset="0%" stopColor="white" stopOpacity="0.7" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
