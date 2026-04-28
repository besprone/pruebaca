import { figmaTypographyTokens } from "../../tokens/figma-typography-tokens";

type Family = "Display" | "Headline" | "Body" | "Button" | "Superscript";
const familyOrder: Family[] = ["Display", "Headline", "Body", "Button", "Superscript"];

function sampleText(path: string): string {
  if (path.includes("/Button/")) return "Button label";
  if (path.includes("/Superscript/")) return "Superscript 12";
  if (path.includes("/Display/")) return "Calipso Typography";
  if (path.includes("/Headline/")) return "Section headline";
  return "The quick brown fox jumps over the lazy dog.";
}

function TokenCard({ path, token }: { path: string; token: (typeof figmaTypographyTokens)[string] }) {
  const sample = sampleText(path);
  const meta = `${token.size}/${token.lineHeight} • ${token.weight}`;
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
          fontFamily: `"${token.family}", system-ui, sans-serif`,
          fontWeight: token.weight,
          fontSize: token.size,
          lineHeight: `${token.lineHeight}px`,
          letterSpacing: `${token.letterSpacing}px`,
          color: "#1c1b20",
          marginBottom: 10,
          minHeight: 46,
        }}
      >
        {sample}
      </div>
      <div style={{ fontWeight: 700, color: "#111", fontSize: 12, wordBreak: "break-all" }}>{path}</div>
      <div style={{ color: "#525866", fontSize: 12, marginTop: 5 }}>{meta}</div>
      <code
        style={{
          display: "block",
          marginTop: 6,
          color: "#5b6070",
          fontSize: 11,
          wordBreak: "break-all",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        }}
      >
        {`family=${token.family}; style=${token.style}; weight=${token.weight}; lineHeight=${token.lineHeight}px`}
      </code>
    </div>
  );
}

export function TypographyScale() {
  const grouped: Record<Family, Array<[string, (typeof figmaTypographyTokens)[string]]>> = {
    Display: [],
    Headline: [],
    Body: [],
    Button: [],
    Superscript: [],
  };

  for (const entry of Object.entries(figmaTypographyTokens)) {
    const [path, token] = entry;
    const maybeFamily = path.split("/")[1] as Family | undefined;
    if (maybeFamily && maybeFamily in grouped) grouped[maybeFamily].push([path, token]);
  }

  return (
    <div style={{ maxWidth: 980, padding: "0 8px 48px" }}>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.55 }}>
        Escala tipográfica extraída del frame de Figma. Mismo lenguaje de tokens en Storybook para diseño y desarrollo.
      </p>
      {familyOrder.map((family) => {
        const tokens = grouped[family].sort(([a], [b]) => a.localeCompare(b));
        return (
          <section key={family} style={{ marginBottom: 22 }}>
            <h3 style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, margin: "0 0 8px", color: "#222" }}>
              {family}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
              {tokens.map(([path, token]) => (
                <TokenCard key={path} path={path} token={token} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
