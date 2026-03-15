export type NodeType = "company" | "person" | "product" | "open-source";
export type DisplayStyle = "photo" | "postit" | "polaroid" | "clipping";

export interface BoardNode {
  id: string;
  label: string;
  image: string;
  type: NodeType;
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
  subtitle?: string;
  note?: string;
  display?: DisplayStyle; // visual presentation style (default: "photo")
}

export interface BoardEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
  color?: string;
  style?: "solid" | "dashed";
}

export interface Board {
  slug: string;
  title: string;
  description?: string;
  nodes: BoardNode[];
  edges: BoardEdge[];
}
