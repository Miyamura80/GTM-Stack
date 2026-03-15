import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useBoard } from "../hooks/useBoard";
import { BoardHeader } from "./BoardHeader";
import { NodeCard } from "./NodeCard";
import { ConnectionLine } from "./ConnectionLine";

export function BoardView() {
  const { slug } = useParams<{ slug: string }>();
  const board = useBoard(slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ w: width, h: height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!board) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-950 text-amber-200 font-title text-2xl">
        Board not found
      </div>
    );
  }

  const nodesById = Object.fromEntries(board.nodes.map((n) => [n.id, n]));

  return (
    <div className="min-h-screen flex flex-col bg-amber-900">
      <BoardHeader title={board.title} description={board.description} />

      {/* Corkboard area */}
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        {/* Cork texture background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#c4a265",
            backgroundImage: `
              radial-gradient(ellipse at 20% 50%, rgba(139,110,60,0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(160,130,70,0.2) 0%, transparent 40%),
              radial-gradient(ellipse at 50% 80%, rgba(120,95,50,0.25) 0%, transparent 45%),
              radial-gradient(circle at 30% 30%, rgba(180,150,90,0.15) 0%, transparent 30%),
              radial-gradient(circle at 70% 70%, rgba(100,80,40,0.2) 0%, transparent 35%)
            `,
          }}
        />
        {/* Subtle grain overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* SVG connections layer */}
        {size.w > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {board.edges.map((edge) => {
              const fromNode = nodesById[edge.from];
              const toNode = nodesById[edge.to];
              if (!fromNode || !toNode) return null;
              return (
                <ConnectionLine
                  key={edge.id}
                  edge={edge}
                  fromNode={fromNode}
                  toNode={toNode}
                  containerWidth={size.w}
                  containerHeight={size.h}
                />
              );
            })}
          </svg>
        )}

        {/* Node cards layer */}
        <div className="absolute inset-0 z-20">
          {board.nodes.map((node) => (
            <NodeCard key={node.id} node={node} />
          ))}
        </div>
      </div>
    </div>
  );
}
