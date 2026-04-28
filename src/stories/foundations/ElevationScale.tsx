import { figmaPathToCssVar } from "../../tokens/figma-path-to-css";
import { elevationUsageNotes, figmaElevationTokens } from "../../tokens/figma-elevation-tokens";

const order = [
  "Elevation/elevation-0",
  "Elevation/elevation-1",
  "Elevation/elevation-2",
  "Elevation/elevation-3",
] as const;

type ElevationPath = (typeof order)[number];

function ShadowPreview({ path }: { path: ElevationPath }) {
  const shadow = figmaElevationTokens[path];
  return (
    <div
      style={{
        background: "var(--semantic-color-bg-surface, #fff)",
        border: "1px solid var(--semantic-color-border-subtle, #ededee)",
        borderRadius: "var(--containers-radius-200, 16px)",
        boxShadow: shadow,
        height: 84,
        width: "100%",
      }}
    />
  );
}

function ElevationCard({ path }: { path: ElevationPath }) {
  const cssVar = figmaPathToCssVar(path);
  const shadow = figmaElevationTokens[path];
  const note = elevationUsageNotes[path] ?? "";
  return (
    <div
      style={{
        border: "1px solid #e7e8ec",
        borderRadius: 12,
        background: "#fff",
        padding: 12,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <ShadowPreview path={path} />
      <div style={{ marginTop: 8, fontWeight: 700, color: "#111", fontSize: 12, wordBreak: "break-all" }}>{path}</div>
      <code
        style={{
          display: "block",
          marginTop: 4,
          color: "#5b6070",
          fontSize: 11,
          wordBreak: "break-all",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        }}
      >
        {cssVar}
      </code>
      <code
        style={{
          display: "block",
          marginTop: 6,
          color: "#1d2130",
          fontSize: 11,
          wordBreak: "break-all",
          lineHeight: 1.4,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          background: "#ececf0",
          borderRadius: 6,
          padding: "5px 6px",
        }}
      >
        {shadow}
      </code>
      <p style={{ margin: "8px 0 0", color: "#525866", fontSize: 12, lineHeight: 1.5 }}>{note}</p>
    </div>
  );
}

export function ElevationScale() {
  return (
    <div style={{ maxWidth: 980, padding: "0 8px 48px" }}>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.55 }}>
        Sistema de elevación con 4 niveles y overlay. Mantener consistencia por nivel y evitar sombras decorativas.
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
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Overlay separado</div>
        <p style={{ margin: 0 }}>
          Para oscurecer fondo de modal/drawer usa <code>semantic/color/bg/overlay</code>; no se resuelve con sombra.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
        {order.map((path) => (
          <ElevationCard key={path} path={path} />
        ))}
      </div>
    </div>
  );
}
