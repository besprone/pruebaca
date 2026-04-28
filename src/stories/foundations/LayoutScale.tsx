import { figmaPathToCssVar } from "../../tokens/figma-path-to-css";
import { figmaLayoutTokens, layoutTokenNotes } from "../../tokens/figma-layout-tokens";

function LayoutTokenCard({ path, px }: { path: string; px: number }) {
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
      <div style={{ fontWeight: 700, color: "#111", fontSize: 12, wordBreak: "break-all" }}>{path}</div>
      <div style={{ color: "#50576a", fontSize: 12, marginTop: 4 }}>{layoutTokenNotes[path]}</div>
      <div
        style={{
          marginTop: 10,
          height: 8,
          width: Math.max(px * 6, 24),
          borderRadius: 999,
          background: "var(--semantic-color-bg-brandSoft, #ddf0dd)",
          border: "1px solid var(--semantic-color-border-default, #d7d7da)",
        }}
      />
      <div style={{ marginTop: 8, color: "#2f3646", fontSize: 12, fontWeight: 700 }}>{px}px</div>
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
        {figmaPathToCssVar(path)}
      </code>
    </div>
  );
}

export function LayoutScale() {
  const entries = Object.entries(figmaLayoutTokens).sort(([, a], [, b]) => a - b);

  return (
    <div style={{ maxWidth: 980, padding: "0 8px 48px" }}>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.55 }}>
        Variables nativas de `layout/*` para estructura de pantalla. Sin ejemplos visuales de pantallas, solo contrato de tokens.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 10 }}>
        {entries.map(([path, px]) => (
          <LayoutTokenCard key={path} path={path} px={px} />
        ))}
      </div>
    </div>
  );
}
