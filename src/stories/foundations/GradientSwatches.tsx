import { figmaPathToCssVar } from "../../tokens/figma-path-to-css";
import { figmaGradientTokens, gradientTokenNotes } from "../../tokens/figma-gradient-tokens";

const order = [
  "semantic/gradient/bg/inverse",
  "semantic/gradient/bg/primary",
  "semantic/gradient/bg/accent",
] as const;

type Path = (typeof order)[number];

function GradientCard({ path }: { path: Path }) {
  const value = figmaGradientTokens[path];
  const cssVar = figmaPathToCssVar(path);
  const note = gradientTokenNotes[path] ?? "";

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
      <div
        style={{
          height: 94,
          borderRadius: 10,
          border: "1px solid rgba(0,0,0,0.08)",
          background: value,
          marginBottom: 10,
        }}
        title={value}
      />
      <div style={{ fontWeight: 700, color: "#121217", fontSize: 13, wordBreak: "break-all" }}>{path}</div>
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
        {value}
      </code>
      <p style={{ margin: "8px 0 0", color: "#414552", fontSize: 12, lineHeight: 1.5 }}>{note}</p>
    </div>
  );
}

export function GradientSwatches() {
  return (
    <div style={{ maxWidth: 980, padding: "0 8px 48px" }}>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.55 }}>
        Gradientes semánticos de foundations. En Figma se gestionan como <strong>Color Styles</strong> (no variables
        nativas), y aquí se exponen como CSS vars para consumo consistente en Storybook y código.
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
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Regla de uso</div>
        <p style={{ margin: 0 }}>
          Usar gradientes con parsimonia (1-2 por pantalla), mantener dirección vertical top-to-bottom y validar
          contraste del contenido en ambos stops.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
        {order.map((path) => (
          <GradientCard key={path} path={path} />
        ))}
      </div>
    </div>
  );
}
