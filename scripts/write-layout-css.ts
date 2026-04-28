import { writeFileSync } from "node:fs";
import { layoutCssBlock } from "../src/tokens/figma-layout-tokens.ts";

const header = `/* Generated from src/tokens/figma-layout-tokens.ts — npm run tokens:layout */\n`;

writeFileSync(new URL("../src/styles/layout-from-figma.css", import.meta.url), header + layoutCssBlock());

console.log("Wrote src/styles/layout-from-figma.css");
