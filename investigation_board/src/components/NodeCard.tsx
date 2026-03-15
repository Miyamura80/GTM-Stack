import type { BoardNode, DisplayStyle } from "../types";
import { PinIcon } from "./PinIcon";

const pinColors = ["#dc2626", "#1d4ed8", "#15803d", "#b45309", "#7c3aed"];

const postitColors = [
  "#fef08a", // yellow
  "#bbf7d0", // green
  "#fed7aa", // orange
  "#bfdbfe", // blue
  "#fecdd3", // pink
];

function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return (((hash % 1000) + 1000) % 1000) / 1000;
}

function seededPick<T>(arr: T[], seed: string): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

interface NodeCardProps {
  node: BoardNode;
}

/**
 * Visual card pinned to the investigation board.
 * Supports multiple display styles for visual variety.
 * Reusable across any board.
 */
export function NodeCard({ node }: NodeCardProps) {
  const rand = seededRandom(node.id);
  const rotation = (rand - 0.5) * 8; // -4 to +4 degrees
  const pinColor = seededPick(pinColors, node.id + "pin");
  const display: DisplayStyle = node.display ?? "photo";

  const inner = (() => {
    switch (display) {
      case "polaroid":
        return <PolaroidCard node={node} />;
      case "postit":
        return <PostItCard node={node} />;
      case "clipping":
        return <ClippingCard node={node} />;
      case "photo":
      default:
        return <PhotoCard node={node} />;
    }
  })();

  return (
    <div
      className="absolute group"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        zIndex: 20,
      }}
    >
      {/* Pushpin */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
        <PinIcon color={pinColor} size={24} instanceId={node.id} />
      </div>

      {inner}

      {/* Note tooltip on hover */}
      {node.note && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/90 text-white text-[10px] px-2.5 py-1 rounded shadow-lg pointer-events-none z-40">
          {node.note}
        </div>
      )}
    </div>
  );
}

/** Crisp photo print - white border, clean image */
function PhotoCard({ node }: { node: BoardNode }) {
  return (
    <div
      className="w-28 bg-white rounded-sm overflow-hidden"
      style={{
        boxShadow:
          "2px 3px 8px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.15)",
      }}
    >
      <div className="w-full h-20 bg-gray-50 flex items-center justify-center p-2.5">
        <img
          src={node.image}
          alt={node.label}
          className="max-w-full max-h-full object-contain"
          draggable={false}
        />
      </div>
      <div className="px-2 py-1.5 border-t border-gray-100">
        <p className="text-[11px] font-semibold text-gray-800 text-center truncate">
          {node.label}
        </p>
        {node.subtitle && (
          <p className="text-[9px] text-gray-400 text-center truncate">
            {node.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

/** Polaroid-style: large white bottom border with handwritten label */
function PolaroidCard({ node }: { node: BoardNode }) {
  return (
    <div
      className="w-32 bg-[#fafaf5]"
      style={{
        boxShadow:
          "3px 4px 12px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.15)",
        padding: "6px 6px 0 6px",
      }}
    >
      <div className="w-full h-24 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={node.image}
          alt={node.label}
          className="max-w-full max-h-full object-contain"
          draggable={false}
        />
      </div>
      <div className="py-2.5 px-1">
        <p
          className="text-[13px] text-gray-700 text-center truncate"
          style={{ fontFamily: "'Special Elite', cursive" }}
        >
          {node.label}
        </p>
        {node.subtitle && (
          <p
            className="text-[10px] text-gray-400 text-center truncate mt-0.5"
            style={{ fontFamily: "'Special Elite', cursive" }}
          >
            {node.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

/** Post-it note: colored square with handwritten text + small image */
function PostItCard({ node }: { node: BoardNode }) {
  const bgColor = seededPick(postitColors, node.id + "postit");

  return (
    <div
      className="w-28 relative"
      style={{
        backgroundColor: bgColor,
        boxShadow:
          "2px 3px 6px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(0,0,0,0.05)",
        padding: "8px",
        minHeight: "100px",
      }}
    >
      {/* Folded corner effect */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4"
        style={{
          background: `linear-gradient(135deg, ${bgColor} 50%, rgba(0,0,0,0.08) 50%)`,
        }}
      />

      {/* Small image */}
      <div className="w-12 h-12 mx-auto mb-1.5 flex items-center justify-center">
        <img
          src={node.image}
          alt={node.label}
          className="max-w-full max-h-full object-contain"
          draggable={false}
        />
      </div>

      <p
        className="text-[12px] text-gray-700 text-center font-medium leading-tight"
        style={{ fontFamily: "'Special Elite', cursive" }}
      >
        {node.label}
      </p>
      {node.subtitle && (
        <p
          className="text-[9px] text-gray-500 text-center mt-0.5"
          style={{ fontFamily: "'Special Elite', cursive" }}
        >
          {node.subtitle}
        </p>
      )}
    </div>
  );
}

/** Newspaper clipping: torn edges, serif-ish text, aged look */
function ClippingCard({ node }: { node: BoardNode }) {
  return (
    <div
      className="w-30 relative"
      style={{
        background:
          "linear-gradient(175deg, #f5f0e0 0%, #ede6d0 40%, #e8e0c8 100%)",
        boxShadow:
          "2px 3px 8px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)",
        padding: "8px 10px",
        // Torn edge via clip-path
        clipPath:
          "polygon(2% 0%, 8% 1%, 15% 0%, 22% 2%, 30% 0%, 38% 1%, 45% 0%, 52% 2%, 60% 0%, 68% 1%, 75% 0%, 82% 2%, 90% 0%, 95% 1%, 100% 0%, 100% 98%, 95% 100%, 88% 98%, 80% 100%, 72% 98%, 65% 100%, 58% 98%, 50% 100%, 42% 98%, 35% 100%, 28% 98%, 20% 100%, 12% 98%, 5% 100%, 0% 98%)",
      }}
    >
      <div className="w-14 h-14 mx-auto mb-1.5 flex items-center justify-center grayscale-[30%] contrast-[1.1]">
        <img
          src={node.image}
          alt={node.label}
          className="max-w-full max-h-full object-contain"
          draggable={false}
        />
      </div>
      <p className="text-[11px] font-bold text-gray-800 text-center leading-tight tracking-tight">
        {node.label}
      </p>
      {node.subtitle && (
        <p className="text-[8px] text-gray-500 text-center italic mt-0.5 tracking-wide uppercase">
          {node.subtitle}
        </p>
      )}
    </div>
  );
}
