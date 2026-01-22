import React from "react";

export function Alert({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff3cd",
        border: "1px solid #ffeeba",
        padding: 12,
        borderRadius: 6,
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

export function AlertDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
