import type { ComponentType } from "react";
import { GtmFunnelDiagram } from "./GtmFunnel";
import { DataFlowDiagram } from "./DataFlow";
import { TechStackDiagram } from "./TechStack";
import { ParetoFrontierDiagram } from "./ParetoFrontier";

export interface DiagramEntry {
  id: string;
  title: string;
  description: string;
  component: ComponentType;
}

export const diagramRegistry: DiagramEntry[] = [
  {
    id: "gtm-funnel",
    title: "GTM Funnel",
    description:
      "Go-to-market pipeline from lead generation through conversion stages.",
    component: GtmFunnelDiagram,
  },
  {
    id: "data-flow",
    title: "Data Flow Architecture",
    description:
      "How data moves between integrations, processing, and output channels.",
    component: DataFlowDiagram,
  },
  {
    id: "tech-stack",
    title: "Tech Stack Overview",
    description:
      "Core technologies and services powering the GTM automation stack.",
    component: TechStackDiagram,
  },
  {
    id: "pareto-frontier",
    title: "Pareto Frontier",
    description:
      "Cost vs. performance trade-off chart showing Pareto-optimal solutions on the frontier.",
    component: ParetoFrontierDiagram,
  },
];
