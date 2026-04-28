import { writeFileSync } from "node:fs";
import { gridCssBlock } from "../src/tokens/figma-grid-tokens.ts";

const header = `/* Generated from src/tokens/figma-grid-tokens.ts — npm run tokens:grid */\n`;

writeFileSync(new URL("../src/styles/grid-from-figma.css", import.meta.url), header + gridCssBlock());

console.log("Wrote src/styles/grid-from-figma.css");
