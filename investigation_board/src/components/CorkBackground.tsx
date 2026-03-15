import type { CSSProperties } from "react";

const corkStyle: CSSProperties = {
  backgroundColor: "#c4a265",
  backgroundImage: `
    radial-gradient(ellipse at 20% 50%, rgba(139,110,60,0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(160,130,70,0.2) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 80%, rgba(120,95,50,0.25) 0%, transparent 45%),
    radial-gradient(circle at 30% 30%, rgba(180,150,90,0.15) 0%, transparent 30%),
    radial-gradient(circle at 70% 70%, rgba(100,80,40,0.2) 0%, transparent 35%)
  `,
};

const grainStyle: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
  backgroundSize: "200px 200px",
};

/**
 * Cork texture background with grain overlay.
 * Used by both BoardIndex and BoardView for consistent appearance.
 */
export function CorkBackground() {
  return (
    <>
      <div className="absolute inset-0" style={corkStyle} />
      <div className="absolute inset-0 opacity-30" style={grainStyle} />
    </>
  );
}

/** Cork style for use as a root element's inline style (BoardIndex). */
export { corkStyle };
