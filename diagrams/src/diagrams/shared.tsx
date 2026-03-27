import React from "react";
import { brand } from "../brand";

/* Whiteboard-style building blocks */

interface BoxProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sublabel?: string;
  fill?: string;
  stroke?: string;
  textColor?: string;
  fontSize?: number;
}

export function WBBox({
  x,
  y,
  w,
  h,
  label,
  sublabel,
  fill = "none",
  stroke = brand.grey,
  textColor = brand.white,
  fontSize = 14,
}: BoxProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.5}
        strokeDasharray="6 3"
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + (sublabel ? -6 : 4)}
        textAnchor="middle"
        fill={textColor}
        fontSize={fontSize}
        fontWeight={600}
        fontFamily="Inter, system-ui, sans-serif"
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fill={brand.grey}
          fontSize={11}
          fontFamily="Inter, system-ui, sans-serif"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

interface ArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  label?: string;
  diagramId?: string;
}

export function WBArrow({
  x1,
  y1,
  x2,
  y2,
  color = brand.cyan,
  label,
  diagramId = "default",
}: ArrowProps) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  const tipX = x2 - ux * 2;
  const tipY = y2 - uy * 2;

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={tipX}
        y2={tipY}
        stroke={color}
        strokeWidth={1.5}
        markerEnd={`url(#arrowhead-${diagramId})`}
        opacity={0.7}
      />
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 6}
          textAnchor="middle"
          fill={brand.grey}
          fontSize={10}
          fontFamily="Inter, system-ui, sans-serif"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function WBDefs({ id = "default" }: { id?: string }) {
  return (
    <defs>
      <marker
        id={`arrowhead-${id}`}
        markerWidth="8"
        markerHeight="6"
        refX="8"
        refY="3"
        orient="auto"
      >
        <polygon points="0 0, 8 3, 0 6" fill={brand.cyan} opacity={0.7} />
      </marker>
    </defs>
  );
}

interface DotGridProps {
  w: number;
  h: number;
}

export function DotGrid({ w, h }: DotGridProps) {
  const dots: React.ReactNode[] = [];
  for (let x = 20; x < w; x += 24) {
    for (let y = 20; y < h; y += 24) {
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={0.8}
          fill={brand.grey}
          opacity={0.15}
        />
      );
    }
  }
  return <g>{dots}</g>;
}
