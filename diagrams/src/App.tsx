import React, { useState } from "react";
import { brand } from "./brand";
import { DiagramCard } from "./components/DiagramCard";
import { diagramRegistry } from "./diagrams/registry";

export function App() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedDiagram = selected
    ? diagramRegistry.find((d) => d.id === selected)
    : null;

  return (
    <div style={{ minHeight: "100vh", background: brand.black }}>
      {/* Header */}
      <header
        style={{
          padding: "40px 48px 32px",
          borderBottom: `1px solid ${brand.grey}33`,
          position: "relative",
          zIndex: 200,
          background: brand.black,
        }}
      >
        <div
          onClick={() => setSelected(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: selected ? "pointer" : "default",
          }}
        >
          <div
            style={{
              width: 8,
              height: 32,
              background: brand.cyan,
              borderRadius: 2,
            }}
          />
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: brand.white,
              letterSpacing: "-0.02em",
            }}
          >
            Diagram Gallery
          </h1>
        </div>
        <p
          style={{
            marginTop: 8,
            fontSize: 14,
            color: brand.grey,
            paddingLeft: 20,
          }}
        >
          {selectedDiagram
            ? selectedDiagram.title
            : `Branded whiteboard-style diagrams \u00B7 ${diagramRegistry.length} diagrams`}
        </p>
      </header>

      {/* Full-screen view */}
      {selectedDiagram && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: brand.black,
            display: "flex",
            flexDirection: "column",
            top: "var(--header-height, 0px)",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "auto",
              padding: 32,
            }}
          >
            <selectedDiagram.component />
          </div>
        </div>
      )}

      {/* Grid */}
      <main
        style={{
          padding: "32px 48px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
          gap: 24,
        }}
      >
        {diagramRegistry.map((d) => (
          <DiagramCard
            key={d.id}
            title={d.title}
            description={d.description}
            onClick={() => setSelected(d.id)}
          >
            <d.component />
          </DiagramCard>
        ))}
      </main>
    </div>
  );
}
