import { figmaPathToCssVar } from "../../tokens/figma-path-to-css";
import { figmaRadiusTokens, radiusIntentNotes } from "../../tokens/figma-radius-tokens";

const order = [
  "radius-0",
  "small items/radius-50",
  "controls/radius-100",
  "controls/radius-125",
  "controls/radius-150",
  "containers/radius-200",
  "containers/radius-300",
  "circular items/radius-round",
] as const;

type RadiusPath = (typeof order)[number];

function RadiusPreview({ px }: { px: number }) {
  const radius = px === 9999 ? 9999 : px;
  return (
    <div
      style={{
        width: 74,
        height: 74,
        borderRadius: radius,
        background: "var(--semantic-color-bg-subtle, #d7d7da)",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    />
  );
}

function RadiusCard({ path }: { path: RadiusPath }) {
  const px = figmaRadiusTokens[path];
  const cssVar = figmaPathToCssVar(path);
  const note = radiusIntentNotes[path] ?? "";
  const label = px === 9999 ? "9999px (round)" : `${px}px`;
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
      <div style={{ display: "flex", alignItems: "center", gap: 12, minHeight: 80 }}>
        <RadiusPreview px={px} />
        <div style={{ color: "#30333b", fontSize: 12, fontWeight: 700 }}>{label}</div>
      </div>
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
      <p style={{ margin: "8px 0 0", color: "#525866", fontSize: 12, lineHeight: 1.5 }}>{note}</p>
    </div>
  );
}

export function RadiusScale() {
  return (
    <div style={{ maxWidth: 980, padding: "0 8px 48px" }}>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.55 }}>
        Sistema de radius para App y Web. Usar siempre tokens (sin valores arbitrarios) para garantizar consistencia
        de forma entre componentes.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 10 }}>
        {order.map((path) => (
          <RadiusCard key={path} path={path} />
        ))}
      </div>
    </div>
  );
}
