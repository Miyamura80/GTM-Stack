import React from "react";
import { brand } from "../brand";
import { WBBox, WBDefs, DotGrid } from "./shared";

const W = 720;
const H = 400;

const layers: { title: string; y: number; items: { label: string; x: number; w: number; accent?: boolean }[] }[] = [
  {
    title: "INFRASTRUCTURE",
    y: 60,
    items: [
      { label: "Python 3.12+", x: 40, w: 130 },
      { label: "UV", x: 190, w: 80 },
      { label: "pytest", x: 290, w: 90 },
      { label: "Ruff", x: 400, w: 80 },
      { label: "Make", x: 500, w: 80 },
    ],
  },
  {
    title: "AI / LLM",
    y: 160,
    items: [
      { label: "DSPY", x: 40, w: 100, accent: true },
      { label: "LangFuse", x: 160, w: 110, accent: true },
      { label: "Claude API", x: 290, w: 120, accent: true },
      { label: "OpenAI", x: 430, w: 100 },
    ],
  },
  {
    title: "INTEGRATIONS",
    y: 260,
    items: [
      { label: "Apollo", x: 40, w: 100 },
      { label: "PhantomBuster", x: 160, w: 140 },
      { label: "Telegram", x: 320, w: 110 },
      { label: "Apify", x: 450, w: 80 },
      { label: "logo.dev", x: 550, w: 100 },
    ],
  },
];

export function TechStackDiagram() {
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ background: brand.black, borderRadius: 12 }}
    >
      <DotGrid w={W} h={H} />
      <WBDefs id="tech-stack" />

      <text
        x={40}
        y={36}
        fill={brand.cyan}
        fontSize={11}
        fontWeight={600}
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="0.08em"
      >
        TECH STACK
      </text>

      {layers.map((layer) => (
        <g key={layer.title}>
          {/* Layer label */}
          <text
            x={W - 30}
            y={layer.y + 30}
            textAnchor="end"
            fill={brand.grey}
            fontSize={9}
            fontFamily="Inter, system-ui, sans-serif"
            letterSpacing="0.1em"
            opacity={0.5}
          >
            {layer.title}
          </text>

          {/* Horizontal rule */}
          <line
            x1={40}
            y1={layer.y}
            x2={W - 40}
            y2={layer.y}
            stroke={brand.grey}
            strokeWidth={0.5}
            opacity={0.15}
          />

          {/* Items */}
          {layer.items.map((item) => (
            <WBBox
              key={item.label}
              x={item.x}
              y={layer.y + 10}
              w={item.w}
              h={48}
              label={item.label}
              fill={item.accent ? `${brand.cyan}14` : `${brand.grey}0A`}
              stroke={item.accent ? `${brand.cyan}66` : `${brand.grey}33`}
              textColor={brand.white}
              fontSize={12}
            />
          ))}
        </g>
      ))}

      <text
        x={W / 2}
        y={H - 16}
        textAnchor="middle"
        fill={brand.grey}
        fontSize={10}
        fontFamily="Inter, system-ui, sans-serif"
        opacity={0.4}
      >
        GTM Stack &middot; core dependencies
      </text>
    </svg>
  );
}
