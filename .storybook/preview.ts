import type { Preview } from "@storybook/react";
import { createElement } from "react";
import { themes } from "@storybook/theming";

import "../src/styles/tokens.css";
import { figmaPathToCssVar } from "../src/tokens/figma-path-to-css";
import { resolveThemeAliasValue, semanticThemeAliases } from "../src/stories/foundations/semantic-theme-aliases";

function applySemanticThemeLight() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  for (const familyMap of Object.values(semanticThemeAliases)) {
    for (const [semanticPath, aliases] of Object.entries(familyMap)) {
      const cssVar = figmaPathToCssVar(semanticPath);
      const alias = aliases.light;
      root.style.setProperty(cssVar, resolveThemeAliasValue(alias));
    }
  }

  root.setAttribute("data-theme-mode", "light");
}

function ThemeRoot({ Story }: { Story: Parameters<NonNullable<Preview["decorators"]>[number]>[0] }) {
  applySemanticThemeLight();
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
  decorators: [
    (Story) => {
      return createElement(ThemeRoot, { Story });
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
