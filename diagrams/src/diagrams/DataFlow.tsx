import React from "react";
import { brand } from "../brand";
import { WBBox, WBArrow, WBDefs, DotGrid } from "./shared";

const W = 760;
const H = 440;

export function DataFlowDiagram() {
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ background: brand.black, borderRadius: 12 }}
    >
      <DotGrid w={W} h={H} />
      <WBDefs />

      <text
        x={40}
        y={40}
        fill={brand.cyan}
        fontSize={11}
        fontWeight={600}
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="0.08em"
      >
        DATA FLOW
      </text>

      {/* Sources column */}
      <text
        x={80}
        y={80}
        textAnchor="middle"
        fill={brand.grey}
        fontSize={10}
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="0.06em"
      >
        SOURCES
      </text>
      <WBBox x={20} y={100} w={120} h={56} label="Podcasts" fill={`${brand.cyan}12`} stroke={brand.cyan} />
      <WBBox x={20} y={176} w={120} h={56} label="Apollo API" />
      <WBBox x={20} y={252} w={120} h={56} label="Apify" />
      <WBBox x={20} y={328} w={120} h={56} label="Manual CSV" />

      {/* Processing column */}
      <text
        x={330}
        y={80}
        textAnchor="middle"
        fill={brand.grey}
        fontSize={10}
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="0.06em"
      >
        PROCESSING
      </text>
      <WBBox x={260} y={130} w={140} h={64} label="LLM Enrichment" sublabel="DSPY · LangFuse" fill={`${brand.cyan}0C`} />
      <WBBox x={260} y={240} w={140} h={64} label="Dedup & Verify" sublabel="Million Verifier" />

      {/* Output column */}
      <text
        x={600}
        y={80}
        textAnchor="middle"
        fill={brand.grey}
        fontSize={10}
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="0.06em"
      >
        OUTPUTS
      </text>
      <WBBox x={530} y={100} w={140} h={56} label="Morning Brief" fill={`${brand.cyan}12`} stroke={brand.cyan} />
      <WBBox x={530} y={176} w={140} h={56} label="Telegram" />
      <WBBox x={530} y={252} w={140} h={56} label="Email Outreach" />
      <WBBox x={530} y={328} w={140} h={56} label="Dashboard" />

      {/* Arrows: sources → processing */}
      <WBArrow x1={140} y1={128} x2={260} y2={155} />
      <WBArrow x1={140} y1={204} x2={260} y2={168} />
      <WBArrow x1={140} y1={280} x2={260} y2={265} />
      <WBArrow x1={140} y1={356} x2={260} y2={278} />

      {/* Arrows: processing → outputs */}
      <WBArrow x1={400} y1={155} x2={530} y2={128} />
      <WBArrow x1={400} y1={165} x2={530} y2={204} />
      <WBArrow x1={400} y1={268} x2={530} y2={280} />
      <WBArrow x1={400} y1={278} x2={530} y2={356} />
    </svg>
  );
}
