import React from "react";

export default function AdminPageShell({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start justify-between mb-7 gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-0.5" style={{ color: "#9b6dff" }}>
            Admin Panel
          </p>
          <h1
            className="text-[28px] font-bold leading-tight tracking-tight"
            style={{ color: "#1e1030", fontFamily: "var(--font-antonio)" }}
          >
            {title}
          </h1>
          {description && (
            <p className="text-sm mt-1" style={{ color: "#6b5f80" }}>{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </div>
  );
}
