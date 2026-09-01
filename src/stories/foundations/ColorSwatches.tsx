import type { CSSProperties, ReactNode } from "react";

import { figmaColorTokens, figmaPathToCssVar } from "../../tokens/figma-color-tokens";
import { resolveThemeAliasValue, semanticThemeAliases, type SemanticFamily } from "./semantic-theme-aliases";

type Grouped = Record<string, Record<string, string>>;

const inlineCode: CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  fontSize: 12,
  color: "#141218",
  background: "#e8e8ec",
  padding: "1px 5px",
  borderRadius: 4,
  wordBreak: "break-all",
};

function colorNeedsAlphaCheckered(hex: string): boolean {
  return /^#([0-9a-fA-F]{8})$/.test(hex) && parseInt(hex.slice(7, 9), 16) < 255;
}

function isInverseSemanticPath(path: string): boolean {
  return path.startsWith("semantic/color/") && path.includes("/inverse");
}

function groupTokens(): { ref: Grouped; semantic: Grouped; semanticInverse: Grouped } {
  const ref: Grouped = {};
  const semantic: Grouped = {};
  const semanticInverse: Grouped = { inverse: {} };
  for (const [path, hex] of Object.entries(figmaColorTokens)) {
    if (path.startsWith("ref/")) {
      const rest = path.slice("ref/".length);
      const segs = rest.split("/");
      // familia = todo menos el último segmento numérico (green, neutral, accent/mint, whiteAlpha…)
      const family = segs.length > 1 ? segs.slice(0, -1).join("/") : (segs[0] ?? "other");
      if (!ref[family]) ref[family] = {};
      ref[family][path] = hex;
    } else if (path.startsWith("semantic/color/")) {
      if (isInverseSemanticPath(path)) {
        semanticInverse.inverse[path] = hex;
        continue;
      }
      const rest = path.slice("semantic/color/".length);
      const family = rest.split("/")[0] ?? "other";
      if (!semantic[family]) semantic[family] = {};
      semantic[family][path] = hex;
    }
  }
  return { ref, semantic, semanticInverse };
}

function Swatch({ path, hex }: { path: string; hex: string }) {
  const cssVar = figmaPathToCssVar(path);
  const showChecker = colorNeedsAlphaCheckered(hex);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "56px 1fr",
        gap: "10px",
        alignItems: "start",
        padding: "10px",
        border: "1px solid #e7e8ec",
        borderRadius: 10,
        background: "#fff",
        fontFamily: "system-ui, sans-serif",
        fontSize: "12px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 40,
          height: 40,
          borderRadius: 8,
          flexShrink: 0,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.1)",
        }}
        title={hex}
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 6,
            margin: 1,
            backgroundColor: hex,
          }}
        />
      </div>
      <div>
        <div style={{ fontWeight: 600, color: "#111", wordBreak: "break-all" }}>{path}</div>
        <div style={{ color: "#555", marginTop: 4 }}>{hex}</div>
        <code style={{ color: "#666", fontSize: 11, wordBreak: "break-all" }}>{cssVar}</code>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "18px",
          margin: "0 0 16px",
          borderBottom: "2px solid #1f6f21",
          paddingBottom: 8,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function FamilyBlock({ family, entries }: { family: string; entries: Record<string, string> }) {
  const rows = Object.entries(entries).sort(([a], [b]) => a.localeCompare(b));
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, margin: "0 0 8px", color: "#333" }}>
        {family}
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 10,
        }}
      >
        {rows.map(([path, hex]) => (
          <Swatch key={path} path={path} hex={hex} />
        ))}
      </div>
    </div>
  );
}

function ThemeModeGrid({
  family,
  mode,
  entries,
}: {
  family: SemanticFamily;
  mode: "light" | "inverse";
  entries: Record<string, { light: string; inverse: string }>;
}) {
  const rows = Object.entries(entries).sort(([a], [b]) => a.localeCompare(b));
  return (
    <div
      style={{
        border: "1px solid #dfe1e5",
        borderRadius: 12,
        background: mode === "light" ? "#fcfcfd" : "#1f2228",
        padding: 12,
      }}
    >
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          marginBottom: 10,
          color: mode === "light" ? "#1c1b20" : "#f5f6f8",
        }}
      >
        Theme {mode} · {family}
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {rows.map(([token, aliases]) => {
          const alias = mode === "light" ? aliases.light : aliases.inverse;
          const hex = resolveThemeAliasValue(alias);
          return (
            <div
              key={`${mode}-${token}`}
              style={{
                display: "grid",
                gridTemplateColumns: "24px 1fr",
                gap: 8,
                alignItems: "start",
                borderBottom: "1px solid rgba(128,128,128,0.16)",
                paddingBottom: 7,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: hex,
                }}
                title={`${token} = ${hex}`}
              />
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                    fontSize: 11,
                    color: mode === "light" ? "#1e2025" : "#e8eaee",
                    wordBreak: "break-all",
                  }}
                >
                  {token}
                </div>
                <div
                  style={{
                    marginTop: 3,
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                    fontSize: 10,
                    color: mode === "light" ? "#50545f" : "#b5bac4",
                    wordBreak: "break-all",
                  }}
                >
                  {alias}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SemanticThemeBoard() {
  const families: SemanticFamily[] = ["text", "bg", "border", "icon"];
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, margin: "0 0 10px", color: "#222" }}>
        Semantic por tema (Light / Inverse)
      </h3>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.5 }}>
        Vista en grid por familia, similar al frame de Figma: cada token semántico se resuelve por modo nativo.
      </p>
      {families.map((family) => (
        <div key={family} style={{ marginBottom: 22 }}>
          <h3 style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, margin: "0 0 8px", color: "#333" }}>
            {family}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 12 }}>
            <ThemeModeGrid family={family} mode="light" entries={semanticThemeAliases[family]} />
            <ThemeModeGrid family={family} mode="inverse" entries={semanticThemeAliases[family]} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ColorSwatches() {
  const { ref } = groupTokens();
  const refOrder = [
    "green",
    "neutral",
    "accent/mint",
    "accent/orchid",
    "success",
    "error",
    "warning",
    "info",
    "whiteAlpha",
    "blackAlpha",
  ];

  return (
    <div style={{ maxWidth: 960, padding: "0 8px 48px" }}>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.5 }}>
        Valores del tema <strong>light</strong> / marca <strong>kubo</strong> (incluye{" "}
        <code style={inlineCode}>ref/whiteAlpha</code> y <code style={inlineCode}>ref/blackAlpha</code>) —
        colección <strong>Color</strong> de Calipso 2.0. Los gradientes no van en variables de color
        sólido; ver foundations en Figma. En "Notas de Figma"
        {" "}se documentan los temas nativos <strong>light</strong> e <strong>inverse</strong> por capa semántica
        (text/bg/border/icon), además de los tokens que terminan en <code style={inlineCode}>/inverse</code>.
      </p>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.5 }}>
        Las familias <code style={inlineCode}>brand</code>, <code style={inlineCode}>accentPrimary</code> y{" "}
        <code style={inlineCode}>accentSecondary</code> dependen de la marca (aquí resueltas con{" "}
        <strong>kubo</strong>: brand&nbsp;=&nbsp;green, accentPrimary&nbsp;=&nbsp;mint,
        accentSecondary&nbsp;=&nbsp;orchid). <code style={inlineCode}>neutral</code> es el gris de sistema
        para chips/tags y no cambia con la marca. Detalle y equivalencias kubo/maestro en "Notas de Figma".
      </p>

      <Section title="Ref (paleta base)">
        {refOrder
          .filter((f) => ref[f])
          .map((f) => (
            <FamilyBlock key={f} family={f} entries={ref[f]!} />
          ))}
        {Object.keys(ref)
          .filter((f) => !refOrder.includes(f))
          .map((f) => (
            <FamilyBlock key={f} family={f} entries={ref[f]!} />
          ))}
      </Section>

      <Section title="Semantic (roles UI)">
        <SemanticThemeBoard />
      </Section>
    </div>
  );
}
