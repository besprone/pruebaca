import { figmaPathToCssVar } from "../../tokens/figma-path-to-css";
import { figmaSpacingTokens, spacingIntentNotes } from "../../tokens/figma-spacing-tokens";

type Group = "internalLayout" | "componentSpacing" | "sectionSpacing";
const order: Group[] = ["internalLayout", "componentSpacing", "sectionSpacing"];

function SpacingBar({ px }: { px: number }) {
  return (
    <div
      style={{
        height: 24,
        width: Math.max(px * 3, 1),
        minWidth: px === 0 ? 1 : undefined,
        borderRadius: 6,
        background: "var(--semantic-color-bg-subtle, #d7d7da)",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    />
  );
}

function SpacingTokenCard({ path, px }: { path: string; px: number }) {
  const cssVar = figmaPathToCssVar(path);
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
      <div style={{ display: "flex", alignItems: "center", gap: 10, minHeight: 34 }}>
        <SpacingBar px={px} />
        <div style={{ color: "#30333b", fontSize: 12, fontWeight: 700 }}>{px}px</div>
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
    </div>
  );
}

export function SpacingScale() {
  const grouped: Record<Group, Array<[string, number]>> = {
    internalLayout: [],
    componentSpacing: [],
    sectionSpacing: [],
  };

  for (const entry of Object.entries(figmaSpacingTokens)) {
    const [path, px] = entry;
    const group = path.split("/")[0] as Group;
    if (group in grouped) grouped[group].push([path, px]);
  }

  return (
    <div style={{ maxWidth: 980, padding: "0 8px 48px" }}>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.55 }}>
        Escala canónica de spacing para App y Web. Usar siempre por token/variable; evitar valores arbitrarios.
      </p>
      {order.map((group) => {
        const rows = grouped[group].sort(([, a], [, b]) => a - b);
        return (
          <section key={group} style={{ marginBottom: 22 }}>
            <h3 style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, margin: "0 0 6px", color: "#222" }}>
              {group}
            </h3>
            <p style={{ margin: "0 0 10px", color: "#515666", fontFamily: "system-ui, sans-serif", fontSize: 13 }}>
              {spacingIntentNotes[group]}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
              {rows.map(([path, px]) => (
                <SpacingTokenCard key={path} path={path} px={px} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
