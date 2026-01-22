import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div style={{ fontWeight: "bold", marginBottom: 8 }}>{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
