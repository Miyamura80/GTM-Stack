import type { BoardEdge, BoardNode } from "../types";

interface ConnectionLineProps {
  edge: BoardEdge;
  fromNode: BoardNode;
  toNode: BoardNode;
  containerWidth: number;
  containerHeight: number;
}

/**
 * Red string connection between two pinned items on an investigation board.
 * Uses cubic bezier curves with natural sag to simulate real string/yarn.
 * Reusable across any board.
 */
export function ConnectionLine({
  edge,
  fromNode,
  toNode,
  containerWidth,
  containerHeight,
}: ConnectionLineProps) {
  const x1 = (fromNode.x / 100) * containerWidth;
  const y1 = (fromNode.y / 100) * containerHeight;
  const x2 = (toNode.x / 100) * containerWidth;
  const y2 = (toNode.y / 100) * containerHeight;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // String sag: more distance = more droop, like real yarn
  const sag = Math.min(dist * 0.18, 80);

  // Perpendicular offset for natural-looking curve
  // String hangs down, so we bias the control points downward
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Seeded variation so each string has slightly different character
  const seed =
    (edge.id.charCodeAt(0) * 7 + edge.id.charCodeAt(edge.id.length - 1) * 13) %
    100;
  const wobble = ((seed / 100) - 0.5) * dist * 0.08;

  // Two control points for cubic bezier - creates a more natural catenary-like curve
  const cp1x = x1 + dx * 0.3 + wobble;
  const cp1y = y1 + dy * 0.3 + sag * 0.7;
  const cp2x = x1 + dx * 0.7 - wobble;
  const cp2y = y1 + dy * 0.7 + sag;

  // Red string by default - investigation board classic
  const stringColor = edge.color ?? "#b91c1c";

  // Label position at curve midpoint (t=0.5 on cubic bezier)
  const labelX = midX + wobble * 0.2;
  const labelY = midY + sag * 0.55;

  const uid = `edge_${edge.id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;

  return (
    <g>
      {/* String shadow for depth */}
      <path
        d={`M ${x1} ${y1} C ${cp1x} ${cp1y + 2}, ${cp2x} ${cp2y + 2}, ${x2} ${y2}`}
        fill="none"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Main string - thick with texture feel */}
      <path
        d={`M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`}
        fill="none"
        stroke={`url(#${uid}_str)`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={edge.style === "dashed" ? "8 5" : undefined}
      />

      {/* Thin highlight thread for texture */}
      <path
        d={`M ${x1} ${y1} C ${cp1x} ${cp1y - 0.5}, ${cp2x} ${cp2y - 0.5}, ${x2} ${y2}`}
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.5"
        strokeLinecap="round"
      />

      {/* Label - text renders first (invisible) so rect can reference its bbox */}
      {edge.label && (
        <g>
          <rect
            x={labelX - edge.label.length * 3.75 - 12}
            y={labelY - 8}
            width={edge.label.length * 7.5 + 24}
            height={16}
            rx={2}
            fill="#fffef5"
            fillOpacity={0.95}
            stroke="#c9b97a"
            strokeWidth="0.5"
            style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))" }}
          />
          <text
            x={labelX}
            y={labelY + 4}
            textAnchor="middle"
            fontSize="9"
            fontWeight="500"
            fill="#5a4a2a"
            fontFamily="Inter, sans-serif"
          >
            {edge.label}
          </text>
        </g>
      )}

      <defs>
        {/* Gradient along the string for yarn-like depth */}
        <linearGradient id={`${uid}_str`} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={stringColor} stopOpacity="0.85" />
          <stop offset="50%" stopColor={stringColor} stopOpacity="1" />
          <stop offset="100%" stopColor={stringColor} stopOpacity="0.85" />
        </linearGradient>
      </defs>
    </g>
  );
}
