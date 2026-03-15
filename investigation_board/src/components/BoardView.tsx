import { useParams } from "react-router-dom";
import { useRef, useState, useLayoutEffect, useMemo } from "react";
import { getBoardBySlug } from "../utils/board_utils";
import { BoardHeader } from "./BoardHeader";
import { NodeCard } from "./NodeCard";
import { ConnectionLine } from "./ConnectionLine";
import { CorkBackground } from "./CorkBackground";

export function BoardView() {
  const { slug } = useParams<{ slug: string }>();
  const board = getBoardBySlug(slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setSize({ w: el.offsetWidth, h: el.offsetHeight });
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

  const nodesById = useMemo(
    () => Object.fromEntries(board.nodes.map((n) => [n.id, n])),
    [board.nodes],
  );

  return (
    <div className="min-h-screen flex flex-col bg-amber-900">
      <BoardHeader title={board.title} description={board.description} />

      {/* Corkboard area */}
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        <CorkBackground />

        {/* SVG connections layer */}
        {size.w > 0 && size.h > 0 && (
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
