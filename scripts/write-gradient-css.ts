import { writeFileSync } from "node:fs";
import { gradientCssBlock } from "../src/tokens/figma-gradient-tokens.ts";

const header = `/* Generated from src/tokens/figma-gradient-tokens.ts — npm run tokens:gradients */\n`;

writeFileSync(new URL("../src/styles/gradients-from-figma.css", import.meta.url), header + gradientCssBlock());

console.log("Wrote src/styles/gradients-from-figma.css");
