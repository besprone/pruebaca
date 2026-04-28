import { writeFileSync } from "node:fs";
import { stateCssBlock } from "../src/tokens/figma-state-tokens.ts";

const header = `/* Generated from src/tokens/figma-state-tokens.ts — npm run tokens:state */\n`;

writeFileSync(new URL("../src/styles/states-from-figma.css", import.meta.url), header + stateCssBlock());

console.log("Wrote src/styles/states-from-figma.css");
