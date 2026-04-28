import { writeFileSync } from "node:fs";
import { radiusCssBlock } from "../src/tokens/figma-radius-tokens.ts";

const header = `/* Generated from src/tokens/figma-radius-tokens.ts — npm run tokens:radius */\n`;

writeFileSync(new URL("../src/styles/radius-from-figma.css", import.meta.url), header + radiusCssBlock());

console.log("Wrote src/styles/radius-from-figma.css");
