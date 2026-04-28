import { figmaPathToCssVar } from "../../tokens/figma-path-to-css";
import { figmaGridTokens, gridBreakpointNotes } from "../../tokens/figma-grid-tokens";

type Device = "mobile" | "tablet" | "desktop";

const order: Device[] = ["mobile", "tablet", "desktop"];

function GridPreview({
  columns,
  gutterPx,
  marginPx,
}: {
  columns: number;
  gutterPx: number;
  marginPx: number;
}) {
  return (
    <div
      style={{
        border: "1px solid #d9dce4",
        borderRadius: 10,
        background: "#fff",
        padding: `10px ${marginPx}px`,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: gutterPx,
          minHeight: 72,
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={index}
            style={{
              background: "var(--semantic-color-state-hover, #0000000a)",
              borderRadius: 6,
              minHeight: 72,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function TokenLine({ path }: { path: string }) {
  const cssVar = figmaPathToCssVar(path);
  const value = figmaGridTokens[path];
  const printable = path.endsWith("/columns") ? String(value) : `${value}px`;
  return (
    <div style={{ marginTop: 6, fontSize: 12, color: "#2e3340", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ fontWeight: 700, wordBreak: "break-all" }}>{path}</div>
      <code
        style={{
          display: "block",
          marginTop: 2,
          color: "#616777",
          fontSize: 11,
          wordBreak: "break-all",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        }}
      >
        {cssVar}: {printable}
      </code>
    </div>
  );
}

export function GridScale() {
  return (
    <div style={{ maxWidth: 1100, padding: "0 8px 48px" }}>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.55 }}>
        Contrato de grid responsive para App/Web usando tokens por dispositivo.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        {order.map((device) => {
          const columns = figmaGridTokens[`${device}/columns`];
          const gutter = figmaGridTokens[`${device}/gutter`];
          const margin = figmaGridTokens[`${device}/margin`];
          return (
            <section
              key={device}
              style={{
                border: "1px solid #e7e8ec",
                borderRadius: 12,
                background: "#fff",
                padding: 12,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 16, color: "#1f2330", fontFamily: "system-ui, sans-serif" }}>
                {device}
              </h3>
              <p
                style={{
                  margin: "6px 0 10px",
                  color: "#5a6070",
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 12,
                }}
              >
                Breakpoint: {gridBreakpointNotes[device]}
              </p>

              <GridPreview columns={columns} gutterPx={gutter} marginPx={margin} />

              <TokenLine path={`${device}/columns`} />
              <TokenLine path={`${device}/margin`} />
              <TokenLine path={`${device}/gutter`} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
