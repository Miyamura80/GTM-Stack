import React from "react";
import { brand } from "../brand";
import { WBDefs, DotGrid } from "./shared";

const W = 720;
const H = 480;

const PAD = { top: 70, right: 40, bottom: 60, left: 70 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

// Quadratic bezier in normalized [0,1] space
// P0 = start, P1 = control, P2 = end
const P0: [number, number] = [0.03, 0.96];
const P2: [number, number] = [0.95, 0.04];
const P1: [number, number] = [P2[0], P0[1]]; // top-right corner → convex

function bezierAt(t: number): [number, number] {
  const u = 1 - t;
  return [
    u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0],
    u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1],
  ];
}

// Generate pareto points by sampling t along the bezier
const paretoT = [0, 0.1, 0.2, 0.3, 0.45, 0.6, 0.75, 0.9, 1.0];
const labels = "ABCDEFGHIJK";
const paretoPoints: [number, number, string, boolean][] = paretoT.map(
  (t, i) => {
    const [cx, cy] = bezierAt(t);
    return [cx, cy, labels[i], true];
  }
);

// Dominated points — scattered with varying distance from frontier
const dominated: [number, number, string, boolean][] = [
  [0.18, 0.80, "L", false],
  [0.55, 0.68, "M", false],
  [0.80, 0.42, "N", false],
  [0.08, 0.42, "O", false],
  [0.90, 0.22, "P", false],
  [0.35, 0.18, "Q", false],
  [0.68, 0.10, "R", false],
  [0.14, 0.25, "S", false],
  [0.48, 0.50, "T", false],
  [0.30, 0.72, "U", false],
  [0.75, 0.58, "V", false],
  [0.42, 0.35, "W", false],
  [0.60, 0.38, "X", false],
  [0.85, 0.08, "Y", false],
  [0.22, 0.55, "Z", false],
];

const allPoints = [...paretoPoints, ...dominated];

function toX(v: number) {
  return PAD.left + v * plotW;
}
function toY(v: number) {
  return PAD.top + (1 - v) * plotH;
}

// Generate a smooth convex curve using a single quadratic bezier
// from the first pareto point to the last, with the control point
// at the corner to guarantee convexity
function convexFrontierPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  const first = pts[0];
  const last = pts[pts.length - 1];
  // Control point at the top-right corner creates a convex bulge
  const cpx = last[0];
  const cpy = first[1];
  return `M ${first[0]} ${first[1]} Q ${cpx} ${cpy}, ${last[0]} ${last[1]}`;
}

export function ParetoFrontierDiagram() {
  const screenPts: [number, number][] = paretoPoints.map(([cx, cy]) => [
    toX(cx),
    toY(cy),
  ]);

  const frontierPath = convexFrontierPath(screenPts);

  // Shaded area above frontier
  const lastPt = screenPts[screenPts.length - 1];
  const firstPt = screenPts[0];
  const shadedPath = [
    frontierPath,
    `L ${lastPt[0]} ${toY(1)}`,
    `L ${firstPt[0]} ${toY(1)}`,
    "Z",
  ].join(" ");

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ background: brand.black, borderRadius: 12 }}
    >
      <DotGrid w={W} h={H} />
      <WBDefs id="pareto-frontier" />

      {/* Title */}
      <text
        x={PAD.left}
        y={36}
        fill={brand.cyan}
        fontSize={11}
        fontWeight={600}
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="0.08em"
      >
        PARETO FRONTIER
      </text>
      <text
        x={PAD.left}
        y={52}
        fill={brand.grey}
        fontSize={10}
        fontFamily="Inter, system-ui, sans-serif"
        opacity={0.6}
      >
        Cost vs. Performance trade-off — optimal solutions on the frontier
      </text>

      {/* Axes */}
      <line
        x1={PAD.left}
        y1={PAD.top}
        x2={PAD.left}
        y2={PAD.top + plotH}
        stroke={brand.grey}
        strokeWidth={1}
        opacity={0.3}
      />
      <line
        x1={PAD.left}
        y1={PAD.top + plotH}
        x2={PAD.left + plotW}
        y2={PAD.top + plotH}
        stroke={brand.grey}
        strokeWidth={1}
        opacity={0.3}
      />

      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((v) => (
        <g key={`grid-${v}`}>
          <line
            x1={PAD.left}
            y1={toY(v)}
            x2={PAD.left + plotW}
            y2={toY(v)}
            stroke={brand.grey}
            strokeWidth={0.5}
            strokeDasharray="4 4"
            opacity={0.12}
          />
          <line
            x1={toX(v)}
            y1={PAD.top}
            x2={toX(v)}
            y2={PAD.top + plotH}
            stroke={brand.grey}
            strokeWidth={0.5}
            strokeDasharray="4 4"
            opacity={0.12}
          />
        </g>
      ))}

      {/* Axis labels */}
      <text
        x={PAD.left + plotW / 2}
        y={H - 14}
        textAnchor="middle"
        fill={brand.grey}
        fontSize={11}
        fontFamily="Inter, system-ui, sans-serif"
      >
        Cost →
      </text>
      <text
        x={18}
        y={PAD.top + plotH / 2}
        textAnchor="middle"
        fill={brand.grey}
        fontSize={11}
        fontFamily="Inter, system-ui, sans-serif"
        transform={`rotate(-90, 18, ${PAD.top + plotH / 2})`}
      >
        Performance →
      </text>

      {/* Tick labels */}
      {["Low", "Mid", "High"].map((label, i) => {
        const v = [0.15, 0.5, 0.85][i];
        return (
          <g key={`tick-${label}`}>
            <text
              x={toX(v)}
              y={PAD.top + plotH + 20}
              textAnchor="middle"
              fill={brand.grey}
              fontSize={9}
              fontFamily="Inter, system-ui, sans-serif"
              opacity={0.5}
            >
              {label}
            </text>
            <text
              x={PAD.left - 12}
              y={toY(v) + 3}
              textAnchor="end"
              fill={brand.grey}
              fontSize={9}
              fontFamily="Inter, system-ui, sans-serif"
              opacity={0.5}
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Shaded optimal region */}
      <path d={shadedPath} fill={brand.cyan} opacity={0.04} />

      {/* Frontier line */}
      <path
        d={frontierPath}
        fill="none"
        stroke={brand.cyan}
        strokeWidth={2}
        strokeDasharray="8 4"
        opacity={0.6}
      />

      {/* Dominated points */}
      {dominated.map(([cx, cy, label]) => (
          <g key={label}>
            <circle
              cx={toX(cx)}
              cy={toY(cy)}
              r={5}
              fill={brand.grey}
              opacity={0.3}
            />
            <text
              x={toX(cx) + 9}
              y={toY(cy) + 3}
              fill={brand.grey}
              fontSize={9}
              fontFamily="Inter, system-ui, sans-serif"
              opacity={0.4}
            >
              {label}
            </text>
          </g>
        ))}

      {/* Pareto-optimal points */}
      {paretoPoints.map(([cx, cy, label]) => (
        <g key={label}>
          <circle
            cx={toX(cx)}
            cy={toY(cy)}
            r={7}
            fill={brand.black}
            stroke={brand.cyan}
            strokeWidth={2}
          />
          <circle
            cx={toX(cx)}
            cy={toY(cy)}
            r={3}
            fill={brand.cyan}
            opacity={0.8}
          />
          <text
            x={toX(cx) + 12}
            y={toY(cy) + 4}
            fill={brand.white}
            fontSize={11}
            fontWeight={600}
            fontFamily="Inter, system-ui, sans-serif"
          >
            {label}
          </text>
        </g>
      ))}

      {/* Legend */}
      <g transform={`translate(${W - 180}, ${PAD.top + 10})`}>
        <circle cx={0} cy={0} r={5} fill={brand.black} stroke={brand.cyan} strokeWidth={1.5} />
        <text x={12} y={4} fill={brand.white} fontSize={10} fontFamily="Inter, system-ui, sans-serif">
          Pareto-optimal
        </text>
        <circle cx={0} cy={20} r={4} fill={brand.grey} opacity={0.3} />
        <text x={12} y={24} fill={brand.grey} fontSize={10} fontFamily="Inter, system-ui, sans-serif" opacity={0.6}>
          Dominated
        </text>
      </g>
    </svg>
  );
}
