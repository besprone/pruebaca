import { writeFileSync } from "node:fs";
import { iconographyCssBlock } from "../src/tokens/figma-iconography-tokens.ts";

const header = `/* Generated from src/tokens/figma-iconography-tokens.ts — npm run tokens:iconography */\n`;

writeFileSync(
  new URL("../src/styles/iconography-from-figma.css", import.meta.url),
  header + iconographyCssBlock(),
);

console.log("Wrote src/styles/iconography-from-figma.css");
