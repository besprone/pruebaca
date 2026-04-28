import { writeFileSync } from "node:fs";
import { spacingCssBlock } from "../src/tokens/figma-spacing-tokens.ts";

const header = `/* Generated from src/tokens/figma-spacing-tokens.ts — npm run tokens:spacing */\n`;

writeFileSync(new URL("../src/styles/spacing-from-figma.css", import.meta.url), header + spacingCssBlock());

console.log("Wrote src/styles/spacing-from-figma.css");
