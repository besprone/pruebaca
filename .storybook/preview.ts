import type { Preview } from "@storybook/react";
import { createElement } from "react";
import { themes } from "@storybook/theming";

import "../src/styles/tokens.css";
import { figmaPathToCssVar } from "../src/tokens/figma-path-to-css";
import {
  resolveThemeAliasValue,
  semanticThemeAliases,
  type SemanticFamily,
} from "../src/tokens/semantic-theme-aliases";
import { brandThemeAliases, type Brand } from "../src/tokens/brand-aliases";

type ThemeMode = "light" | "inverse";

/**
 * Resuelve cada `--semantic-color-*` para la marca + modo dados y lo aplica
 * sobre `:root`. Mezcla la capa independiente de marca (`semanticThemeAliases`)
 * con la dependiente de marca (`brandThemeAliases[brand]`).
 */
function applySemanticTheme(brand: Brand, mode: ThemeMode = "light") {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const families: SemanticFamily[] = ["text", "bg", "border", "icon"];

  for (const family of families) {
    const merged = {
      ...semanticThemeAliases[family],
      ...brandThemeAliases[brand][family],
    };
    for (const [semanticPath, aliases] of Object.entries(merged)) {
      const cssVar = figmaPathToCssVar(semanticPath);
      root.style.setProperty(cssVar, resolveThemeAliasValue(aliases[mode]));
    }
  }

  root.setAttribute("data-theme-mode", mode);
  root.setAttribute("data-brand", brand);
}

function ThemeRoot({
  Story,
  brand,
}: {
  Story: Parameters<NonNullable<Preview["decorators"]>[number]>[0];
  brand: Brand;
}) {
  applySemanticTheme(brand, "light");
  return createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: "var(--semantic-color-bg-canvas, #f7f7f8)",
        color: "var(--semantic-color-text-primary, #1c1b20)",
      },
    },
    createElement(Story),
  );
}

const preview: Preview = {
  globalTypes: {
    brand: {
      description: "Marca activa (tematización por marca)",
      defaultValue: "kubo",
      toolbar: {
        title: "Marca",
        icon: "paintbrush",
        items: [
          { value: "kubo", title: "kubo" },
          { value: "maestro", title: "maestro" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const brand = (context.globals.brand as Brand) ?? "kubo";
      return createElement(ThemeRoot, { Story, brand });
    },
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      theme: themes.light,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
