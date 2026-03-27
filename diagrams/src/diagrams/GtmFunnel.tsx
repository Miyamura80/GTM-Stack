import React from "react";
import { brand } from "../brand";
import { WBBox, WBArrow, WBDefs, DotGrid } from "./shared";

const W = 720;
const H = 420;

const stages = [
  { label: "Lead Gen", sub: "Podcasts · Apollo", x: 40 },
  { label: "Enrichment", sub: "PhantomBuster · Verify", x: 200 },
  { label: "Outreach", sub: "Email · Telegram", x: 360 },
  { label: "Conversion", sub: "Demo · Close", x: 520 },
];

export function GtmFunnelDiagram() {
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ background: brand.black, borderRadius: 12 }}
    >
      <DotGrid w={W} h={H} />
      <WBDefs id="gtm-funnel" />

      {/* Title */}
      <text
        x={40}
        y={40}
        fill={brand.cyan}
        fontSize={11}
        fontWeight={600}
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="0.08em"
      >
        GTM FUNNEL
      </text>

      {/* Funnel shape (subtle trapezoid) */}
      <polygon
        points={`30,80 ${W - 30},80 ${W - 120},${H - 40} 120,${H - 40}`}
        fill="none"
        stroke={brand.grey}
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.2}
      />

      {/* Stage boxes */}
      {stages.map((s, i) => (
        <React.Fragment key={s.label}>
          <WBBox
            x={s.x}
            y={140}
            w={140}
            h={80}
            label={s.label}
            sublabel={s.sub}
            fill={`${brand.cyan}${i === 0 ? "18" : "0A"}`}
            stroke={i === 0 ? brand.cyan : brand.grey}
            textColor={brand.white}
          />
          {i < stages.length - 1 && (
            <WBArrow
              x1={s.x + 140}
              y1={180}
              x2={stages[i + 1].x}
              y2={180}
              diagramId="gtm-funnel"
            />
          )}
        </React.Fragment>
      ))}

      {/* Metrics row */}
      {["100%", "65%", "30%", "12%"].map((pct, i) => (
        <text
          key={pct}
          x={stages[i].x + 70}
          y={260}
          textAnchor="middle"
          fill={brand.cyan}
          fontSize={20}
          fontWeight={700}
          fontFamily="Inter, system-ui, sans-serif"
          opacity={0.6}
        >
          {pct}
        </text>
      ))}

      {/* Bottom note */}
      <text
        x={W / 2}
        y={H - 20}
        textAnchor="middle"
        fill={brand.grey}
        fontSize={11}
        fontFamily="Inter, system-ui, sans-serif"
        opacity={0.5}
      >
        pipeline conversion rates
      </text>
    </svg>
  );
}
