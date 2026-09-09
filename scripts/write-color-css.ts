import { writeFileSync } from "node:fs";
import { colorCssBlock, figmaPathToCssVar } from "../src/tokens/figma-color-tokens.ts";
import { resolveThemeAliasValue } from "../src/tokens/semantic-theme-aliases.ts";
import { brandThemeAliases } from "../src/tokens/brand-aliases.ts";

const header = `/* Generated from src/tokens/figma-color-tokens.ts — npm run tokens:colors */\n`;

/** `[data-brand="maestro"]` — redefine solo las 26 familias de marca (modo light). */
function brandOverrideBlock(): string {
  const lines: string[] = [];
  for (const family of Object.values(brandThemeAliases.maestro)) {
    for (const [path, aliases] of Object.entries(family)) {
      lines.push(`  ${figmaPathToCssVar(path)}: ${resolveThemeAliasValue(aliases.light)};`);
    }
  }
  return (
    `\n/* Marca maestro — redefine solo las familias de marca (brand*, accentPrimary*,\n` +
    `   accentSecondary*) en modo light. Consumidores sin JS: <html data-brand="maestro">.\n` +
    `   El modo inverse y el toggle en vivo los maneja .storybook/preview.ts. */\n` +
    `[data-brand="maestro"] {\n${lines.join("\n")}\n}\n`
  );
}

writeFileSync(
  new URL("../src/styles/colors-from-figma.css", import.meta.url),
  header + colorCssBlock() + brandOverrideBlock(),
);

console.log("Wrote src/styles/colors-from-figma.css");
