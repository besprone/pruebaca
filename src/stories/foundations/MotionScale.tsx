import type { ReactNode } from "react";
import { useState } from "react";
import { figmaPathToCssVar } from "../../tokens/figma-path-to-css";
import {
  figmaMotionLinear200Tokens,
  figmaMotionSpringTokens,
  motionPrototypeNotes,
} from "../../tokens/figma-motion-tokens";

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section
      style={{
        border: "1px solid #e7e8ec",
        borderRadius: 12,
        background: "#fff",
        padding: 12,
      }}
    >
      <h3 style={{ margin: "0 0 8px", fontSize: 16, color: "#1f2330", fontFamily: "system-ui, sans-serif" }}>{title}</h3>
      {children}
    </section>
  );
}

function TokenLine({ path, value }: { path: string; value: string }) {
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ fontFamily: "system-ui, sans-serif", fontWeight: 700, fontSize: 12, color: "#1d2330" }}>{path}</div>
      <code
        style={{
          display: "block",
          marginTop: 2,
          color: "#5b6070",
          fontSize: 11,
          wordBreak: "break-all",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        }}
      >
        {figmaPathToCssVar(path)}: {value}
      </code>
    </div>
  );
}

function MotionDemo({
  label,
  durationMs,
  timingFunction,
}: {
  label: string;
  durationMs: number;
  timingFunction: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          position: "relative",
          height: 44,
          borderRadius: 10,
          border: "1px solid #e7e8ec",
          background: "#f7f8fb",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "var(--semantic-color-border-focus, #257cff)",
            transform: active ? "translateX(220px)" : "translateX(0)",
            transitionProperty: "transform",
            transitionDuration: `${durationMs}ms`,
            transitionTimingFunction: timingFunction,
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
        <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 12, color: "#4a5160" }}>{label}</span>
        <button
          type="button"
          onClick={() => setActive((prev) => !prev)}
          style={{
            border: "1px solid #d5d9e2",
            borderRadius: 8,
            padding: "4px 8px",
            background: "#fff",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          {active ? "Reset" : "Play"}
        </button>
      </div>
    </div>
  );
}

export function MotionScale() {
  return (
    <div style={{ maxWidth: 980, padding: "0 8px 48px" }}>
      <p style={{ fontFamily: "system-ui, sans-serif", color: "#444", lineHeight: 1.55 }}>
        Contrato de motion para overlays y surfaces elevadas. El comportamiento principal es spring fisico.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        <Card title="Spring (implementacion)">
          {Object.entries(figmaMotionSpringTokens).map(([path, value]) => (
            <TokenLine key={path} path={path} value={String(value)} />
          ))}
          <code
            style={{
              display: "block",
              marginTop: 10,
              color: "#3d4657",
              fontSize: 11,
              wordBreak: "break-word",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            }}
          >
            withSpring(value, {`{ mass: 1, stiffness: 100, damping: 15 }`})
          </code>
          <MotionDemo
            label='Demo spring-like (aproximacion CSS con curva "back")'
            durationMs={450}
            timingFunction="cubic-bezier(0.34, 1.56, 0.64, 1)"
          />
        </Card>

        <Card title="Linear-200">
          {Object.entries(figmaMotionLinear200Tokens).map(([path, value]) => {
            const printable = path.endsWith("duration-ms") ? `${value}ms` : String(value);
            return <TokenLine key={path} path={path} value={printable} />;
          })}
          <code
            style={{
              display: "block",
              marginTop: 10,
              color: "#3d4657",
              fontSize: 11,
              wordBreak: "break-word",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            }}
          >
            withTiming(value, {`{ durationMs: 200, easing: "linear" }`})
          </code>
          <MotionDemo label="Demo linear-200" durationMs={200} timingFunction="linear" />
        </Card>

        <Card title="Prototipo (Figma)">
          <p style={{ margin: 0, fontFamily: "system-ui, sans-serif", color: "#4a5160", fontSize: 13, lineHeight: 1.45 }}>
            Curva: <strong>{motionPrototypeNotes.figmaCurve}</strong>
          </p>
          <p style={{ margin: "6px 0 0", fontFamily: "system-ui, sans-serif", color: "#4a5160", fontSize: 13, lineHeight: 1.45 }}>
            Duracion: <strong>{motionPrototypeNotes.figmaDurationMs}ms</strong>
          </p>
          <p style={{ margin: "6px 0 0", fontFamily: "system-ui, sans-serif", color: "#4a5160", fontSize: 13, lineHeight: 1.45 }}>
            Direccion: <strong>{motionPrototypeNotes.figmaDirection}</strong>
          </p>
        </Card>
      </div>
    </div>
  );
}
