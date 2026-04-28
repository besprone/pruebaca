import { figmaPathToCssVar } from "../../tokens/figma-path-to-css";
import { figmaStateTokens, stateTokenNotes } from "../../tokens/figma-state-tokens";

const order = [
  "semantic/color/state/disabled",
  "semantic/color/state/hover",
  "semantic/color/state/focus",
  "semantic/color/state/focusRing",
  "semantic/color/state/pressed",
  "semantic/color/state/dragged",
] as const;

const inlineCode: React.CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  fontSize: 12,
  color: "#141218",
  background: "#e8e8ec",
  padding: "1px 5px",
  borderRadius: 4,
  wordBreak: "break-all",
};

function hasAlpha(hex: string): boolean {
  return /^#([0-9a-fA-F]{8})$/.test(hex) && parseInt(hex.slice(7, 9), 16) < 255;
}

function Row({ path, hex }: { path: (typeof order)[number]; hex: string }) {
  const css = figmaPathToCssVar(path);
  const note = stateTokenNotes[path] ?? "";
  const isRing = path.endsWith("focusRing");
  const showChecker = hasAlpha(hex) && !isRing;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "72px 1fr",
        gap: 12,
        padding: 12,
        border: "1px solid #e7e8ec",
        borderRadius: 10,
        background: "#fff",
        fontFamily: "system-ui, sans-serif",
        fontSize: 12,
        alignItems: "start",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 64,
          height: 64,
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.12)",
          background: "linear-gradient(135deg, #f7f7f8, #d7d7da)",
          boxShadow: isRing ? `0 0 0 2px ${hex}33 inset` : "none",
        }}
      >
        {showChecker ? (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `
                linear-gradient(45deg, #c8c8d0 25%, transparent 25%),
                linear-gradient(-45deg, #c8c8d0 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #c8c8d0 75%),
                linear-gradient(-45deg, transparent 75%, #c8c8d0 75%)
              `,
              backgroundSize: "8px 8px",
              backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0",
              backgroundColor: "#e8e8ec",
            }}
          />
        ) : null}
        {!isRing ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: hex,
              pointerEvents: "none",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 8,
              borderRadius: 8,
              border: `3px solid ${hex}`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>
      <div>
        <div style={{ fontWeight: 600, color: "#111", wordBreak: "break-all" }}>{path}</div>
        <div style={{ color: "#555", marginTop: 4 }}>{hex}</div>
        <code style={{ color: "#666", fontSize: 11, wordBreak: "break-all" }}>{css}</code>
        <p style={{ margin: "8px 0 0", lineHeight: 1.5, color: "#444" }}>{note}</p>
      </div>
    </div>
  );
}

export function StateSwatches() {
  return (
    <div style={{ maxWidth: 960, padding: "0 8px 48px" }}>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.5 }}>
        Tokens de la capa <strong>state</strong> (overlays y anillo de foco). Fuente: frame{" "}
        <a href="https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=2644-16157">State / kubo</a>.
        Sin separación por tema: su resolución actual es la misma para light/inverse. Aplicar siempre por variable,
        nunca por hex directo.
      </p>
      <div
        role="note"
        style={{
          marginTop: 0,
          marginBottom: 12,
          padding: "12px 14px",
          borderRadius: 8,
          border: "1px solid #8fc98f",
          background: "linear-gradient(180deg, #f6fbf6 0%, #eef5ee 100%)",
          color: "#1c1b20",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 14,
          lineHeight: 1.55,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>State (consistente en todos los temas)</div>
        <p style={{ margin: 0 }}>
          La capa <code style={inlineCode}>semantic/color/state/*</code> mantiene el mismo comportamiento visual entre
          light e inverse. Se usa como overlay de interacción sobre el color base del componente.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 10 }}>
        {order.map((path) => (
          <Row key={path} path={path} hex={figmaStateTokens[path]!} />
        ))}
      </div>
    </div>
  );
}
