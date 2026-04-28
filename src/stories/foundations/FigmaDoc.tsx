import type { CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const prose: CSSProperties = {
  maxWidth: 960,
  lineHeight: 1.65,
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: 14,
  color: "#1c1b20",
};

const h2: CSSProperties = {
  marginTop: 28,
  marginBottom: 12,
  paddingBottom: 6,
  borderBottom: "2px solid #e6f5e6",
  fontSize: 18,
  fontWeight: 700,
};

const h3: CSSProperties = {
  marginTop: 20,
  marginBottom: 8,
  fontSize: 15,
  fontWeight: 600,
};

const p: CSSProperties = { margin: "0 0 10px" };

const ul: CSSProperties = { margin: "0 0 12px", paddingLeft: 20 };
const li: CSSProperties = { marginBottom: 6 };
const blockquote: CSSProperties = {
  margin: "12px 0",
  padding: "8px 12px",
  borderLeft: "4px solid #2e9f30",
  background: "#f7f7f8",
  fontSize: 13,
};
const codeInline: CSSProperties = {
  background: "#e4e4e8",
  padding: "2px 6px",
  borderRadius: 4,
  fontSize: 13,
  color: "#141218",
  wordBreak: "break-word",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
};
const tableWrap: CSSProperties = {
  width: "100%",
  overflowX: "auto",
  margin: "12px 0 20px",
  WebkitOverflowScrolling: "touch",
};

const table: CSSProperties = {
  width: "100%",
  minWidth: 480,
  borderCollapse: "collapse",
  fontSize: 13,
  border: "1px solid #d7d7da",
  borderRadius: 6,
  overflow: "hidden",
};

const th: CSSProperties = {
  textAlign: "left",
  borderBottom: "1px solid #bfc0c5",
  padding: "10px 12px",
  fontWeight: 600,
  color: "#141218",
  background: "#f0f0f2",
  verticalAlign: "top",
  minWidth: 120,
};
const td: CSSProperties = {
  borderBottom: "1px solid #ededee",
  padding: "10px 12px",
  verticalAlign: "top",
  color: "#2b2a30",
  fontSize: 14,
  background: "#fff",
};

type Props = { content: string };

/**
 * Contenido Markdown copiado/adaptado del frame de Figma (foundations).
 * Añade nuevas páginas con `doc/<tema>-from-figma.md` e impórtalas con `?raw`.
 */
export function FigmaDoc({ content }: Props) {
  return (
    <div style={prose}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: (props) => <h2 style={h2} {...props} />,
          h3: (props) => <h3 style={h3} {...props} />,
          p: (props) => <p style={p} {...props} />,
          ul: (props) => <ul style={ul} {...props} />,
          li: (props) => <li style={li} {...props} />,
          strong: (props) => <strong style={{ color: "#0e0d10", fontWeight: 600 }} {...props} />,
          blockquote: (props) => <blockquote style={blockquote} {...props} />,
          code: (props) => {
            const { className, children, ...rest } = props;
            if (className) return <code className={className} {...rest}>{children}</code>;
            return <code style={codeInline} {...rest}>{children}</code>;
          },
          table: (props) => (
            <div style={tableWrap}>
              <table style={table} {...props} />
            </div>
          ),
          thead: (props) => <thead {...props} />,
          tbody: (props) => <tbody {...props} />,
          tr: (props) => <tr {...props} />,
          th: (props) => <th style={th} {...props} />,
          td: (props) => <td style={td} {...props} />,
          a: (props) => <a style={{ color: "#1f6f21" }} {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
