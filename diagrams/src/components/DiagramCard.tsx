import React from "react";
import { brand } from "../brand";

interface DiagramCardProps {
  title: string;
  description: string;
  onClick: () => void;
  children: React.ReactNode;
}

export function DiagramCard({
  title,
  description,
  onClick,
  children,
}: DiagramCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: `${brand.grey}0D`,
        border: `1px solid ${brand.grey}22`,
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${brand.cyan}44`;
        e.currentTarget.style.boxShadow = `0 0 24px ${brand.cyan}11`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${brand.grey}22`;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Preview area */}
      <div
        style={{
          height: 280,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${brand.black}`,
          position: "relative",
        }}
      >
        <div
          style={{
            transform: "scale(0.55)",
            transformOrigin: "center center",
            pointerEvents: "none",
          }}
        >
          {children}
        </div>
      </div>

      {/* Info */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: `1px solid ${brand.grey}22`,
        }}
      >
        <h3
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: brand.white,
            marginBottom: 4,
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: 13, color: brand.grey, lineHeight: 1.4 }}>
          {description}
        </p>
      </div>
    </div>
  );
}
