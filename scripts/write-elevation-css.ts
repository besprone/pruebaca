import { writeFileSync } from "node:fs";
import { elevationCssBlock } from "../src/tokens/figma-elevation-tokens.ts";

const header = `/* Generated from src/tokens/figma-elevation-tokens.ts — npm run tokens:elevation */\n`;

writeFileSync(new URL("../src/styles/elevation-from-figma.css", import.meta.url), header + elevationCssBlock());

console.log("Wrote src/styles/elevation-from-figma.css");
