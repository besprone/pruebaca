import { writeFileSync } from "node:fs";
import { colorCssBlock } from "../src/tokens/figma-color-tokens.ts";

const header = `/* Generated from src/tokens/figma-color-tokens.ts — npm run tokens:colors */\n`;

writeFileSync(new URL("../src/styles/colors-from-figma.css", import.meta.url), header + colorCssBlock());

console.log("Wrote src/styles/colors-from-figma.css");
