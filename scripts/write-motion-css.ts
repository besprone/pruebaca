import { writeFileSync } from "node:fs";
import { motionCssBlock } from "../src/tokens/figma-motion-tokens.ts";

const header = `/* Generated from src/tokens/figma-motion-tokens.ts — npm run tokens:motion */\n`;

writeFileSync(new URL("../src/styles/motion-from-figma.css", import.meta.url), header + motionCssBlock());

console.log("Wrote src/styles/motion-from-figma.css");
