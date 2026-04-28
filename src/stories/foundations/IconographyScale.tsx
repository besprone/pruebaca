import {
  Add,
  ArrowRight,
  Calendar,
  Checkmark,
  Close,
  Download,
  Edit,
  Home,
  Notification,
  Search,
  Settings,
  User,
} from "@carbon/icons-react";
import { figmaPathToCssVar } from "../../tokens/figma-path-to-css";
import { figmaIconSizeTokens, iconographyNotes } from "../../tokens/figma-iconography-tokens";

const sampleIcons = [
  { name: "Add", Icon: Add },
  { name: "Search", Icon: Search },
  { name: "User", Icon: User },
  { name: "Calendar", Icon: Calendar },
  { name: "Settings", Icon: Settings },
  { name: "Notification", Icon: Notification },
  { name: "ArrowRight", Icon: ArrowRight },
  { name: "Download", Icon: Download },
  { name: "Checkmark", Icon: Checkmark },
  { name: "Close", Icon: Close },
  { name: "Home", Icon: Home },
  { name: "Edit", Icon: Edit },
];

function SizeCard({ path, px }: { path: string; px: number }) {
  const cssVar = figmaPathToCssVar(path);
  return (
    <section
      style={{
        border: "1px solid #e7e8ec",
        borderRadius: 12,
        background: "#fff",
        padding: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <strong style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "#1f2330" }}>{path}</strong>
        <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 12, color: "#596072" }}>{px}px</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 10,
          padding: 10,
          borderRadius: 10,
          border: "1px solid #eceef3",
          background: "var(--semantic-color-bg-surface, #fff)",
        }}
      >
        {sampleIcons.map(({ name, Icon }) => (
          <div
            key={`${path}-${name}`}
            title={name}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 36 }}
          >
            <Icon size={px} />
          </div>
        ))}
      </div>

      <code
        style={{
          display: "block",
          marginTop: 8,
          color: "#5b6070",
          fontSize: 11,
          wordBreak: "break-all",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        }}
      >
        {cssVar}: {px}px
      </code>
    </section>
  );
}

export function IconographyScale() {
  const sizes = Object.entries(figmaIconSizeTokens).sort(([, a], [, b]) => a - b);

  return (
    <div style={{ maxWidth: 1100, padding: "0 8px 48px" }}>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.55 }}>
        Catalogo visual de iconos usando {iconographyNotes.libraryName} con tamanos oficiales del sistema.
      </p>
      <p style={{ marginTop: -2, marginBottom: 12, fontFamily: "system-ui, sans-serif", fontSize: 12 }}>
        <a href={iconographyNotes.libraryUrl} target="_blank" rel="noreferrer">
          {iconographyNotes.libraryUrl}
        </a>
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        {sizes.map(([path, px]) => (
          <SizeCard key={path} path={path} px={px} />
        ))}
      </div>
    </div>
  );
}
