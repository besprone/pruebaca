import type { ReactNode } from "react";

import { figmaColorTokens, figmaPathToCssVar } from "../../tokens/figma-color-tokens";

type Grouped = Record<string, Record<string, string>>;

function groupTokens(): { ref: Grouped; semantic: Grouped } {
  const ref: Grouped = {};
  const semantic: Grouped = {};
  for (const [path, hex] of Object.entries(figmaColorTokens)) {
    if (path.startsWith("ref/color/")) {
      const rest = path.slice("ref/color/".length);
      const family = rest.split("/")[0] ?? "other";
      if (!ref[family]) ref[family] = {};
      ref[family][path] = hex;
    } else if (path.startsWith("semantic/color/")) {
      const rest = path.slice("semantic/color/".length);
      const family = rest.split("/")[0] ?? "other";
      if (!semantic[family]) semantic[family] = {};
      semantic[family][path] = hex;
    }
  }
  return { ref, semantic };
}

function Swatch({ path, hex }: { path: string; hex: string }) {
  const cssVar = figmaPathToCssVar(path);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "48px 1fr",
        gap: "12px",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid #eee",
        fontFamily: "system-ui, sans-serif",
        fontSize: "12px",
      }}
    >
      <div
        title={hex}
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundColor: hex,
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      />
      <div>
        <div style={{ fontWeight: 600, color: "#111" }}>{path}</div>
        <div style={{ color: "#555", marginTop: 4 }}>{hex}</div>
        <code style={{ color: "#666", fontSize: 11 }}>{cssVar}</code>
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
      <div>
        {rows.map(([path, hex]) => (
          <Swatch key={path} path={path} hex={hex} />
        ))}
      </div>
    </div>
  );
}

export function ColorSwatches() {
  const { ref, semantic } = groupTokens();
  const refOrder = ["brand", "neutral", "accent", "feedback"];
  const semOrder = ["text", "bg", "border", "icon"];

  return (
    <div style={{ maxWidth: 960, padding: "0 8px 48px" }}>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.5 }}>
        Valores del modo actual exportados desde Figma (frame{" "}
        <a href="https://www.figma.com/design/XhvIIW42BM1u2ViM0MaBR0/Calipso-2.0?node-id=2080-939">
          kubo.color
        </a>
        ). Los gradientes no están en variables de color; ver foundations en Figma.
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
        {semOrder
          .filter((f) => semantic[f])
          .map((f) => (
            <FamilyBlock key={f} family={f} entries={semantic[f]!} />
          ))}
        {Object.keys(semantic)
          .filter((f) => !semOrder.includes(f))
          .map((f) => (
            <FamilyBlock key={f} family={f} entries={semantic[f]!} />
          ))}
      </Section>
    </div>
  );
}
