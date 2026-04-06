import React from "react";
import { brand } from "../brand";
import { DotGrid } from "./shared";

const W = 720;
const H = 480;

const PAD = { top: 70, right: 40, bottom: 60, left: 70 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

function toX(v: number) {
  return PAD.left + v * plotW;
}
// Y-axis max is determined by the volatile curve's peak
const Y_MAX = 3.0;

function toY(v: number) {
  return PAD.top + (1 - v / Y_MAX) * plotH;
}

// Steady monotonic growth (gentle logarithmic rise, tops out ~1.0)
function steadyGrowth(t: number): number {
  return 0.05 + 0.95 * (1 - Math.exp(-2.5 * t));
}

// Volatile curve - rapid growth with violent high-frequency oscillations
// Terminal value ~3x the steady curve
function volatileCurve(t: number): number {
  const base = 0.05 + 2.95 * Math.pow(t, 0.06 + t * 2.5);
  // Scale noise proportionally to base for consistent visual volatility
  const noise =
    (Math.sin(t * 60) * 0.10 +
    Math.sin(t * 97 + 0.7) * 0.08 +
    Math.sin(t * 143 + 2.1) * 0.06 +
    Math.sin(t * 211 + 4.3) * 0.05 +
    Math.sin(t * 37 + 1.5) * 0.07) * (1 + base * 2);
  return Math.max(0.01, base + noise);
}

const STEPS = 120;

function buildPath(fn: (t: number) => number): string {
  const parts: string[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const x = toX(t);
    const y = toY(fn(t));
    parts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return parts.join(" ");
}

export function GrowthComparisonDiagram() {
  const steadyPath = buildPath(steadyGrowth);
  const volatilePath = buildPath(volatileCurve);

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ background: brand.black, borderRadius: 12 }}
    >
      <DotGrid w={W} h={H} />
      <defs>
        <clipPath id="plot-area-growth">
          <rect x={PAD.left} y={PAD.top} width={plotW} height={plotH} />
        </clipPath>
      </defs>

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
        CODEBASE PROGRESSION
      </text>
      <text
        x={PAD.left}
        y={52}
        fill={brand.grey}
        fontSize={10}
        fontFamily="Inter, system-ui, sans-serif"
        opacity={0.6}
      >
        Steady monotonic growth vs. volatile high-growth trajectory
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
        Time →
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
        Codebase Progression →
      </text>

      {/* Volatile curve */}
      <path
        d={volatilePath}
        fill="none"
        stroke={brand.white}
        strokeWidth={1.5}
        opacity={0.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#plot-area-growth)"
      />

      {/* Steady growth curve (solid cyan) */}
      <path
        d={steadyPath}
        fill="none"
        stroke={brand.cyan}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#plot-area-growth)"
      />

      {/* Legend */}
      <g transform={`translate(${W - 200}, ${PAD.top + 8})`}>
        <line
          x1={0}
          y1={0}
          x2={20}
          y2={0}
          stroke={brand.cyan}
          strokeWidth={2.5}
        />
        <text
          x={28}
          y={4}
          fill={brand.white}
          fontSize={10}
          fontFamily="Inter, system-ui, sans-serif"
        >
          Steady growth
        </text>

        <line
          x1={0}
          y1={20}
          x2={20}
          y2={20}
          stroke={brand.white}
          strokeWidth={1.5}
          opacity={0.7}
        />
        <text
          x={28}
          y={24}
          fill={brand.white}
          fontSize={10}
          fontFamily="Inter, system-ui, sans-serif"
        >
          Volatile growth
        </text>
      </g>
    </svg>
  );
}
