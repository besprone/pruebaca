import { figmaColorTokens } from "../../tokens/figma-color-tokens";

type ThemeAlias = { light: string; inverse: string };
export type SemanticFamily = "text" | "bg" | "border" | "icon";

export const semanticThemeAliases: Record<SemanticFamily, Record<string, ThemeAlias>> = {
  text: {
    "semantic/color/text/primary": { light: "ref/color/neutral/900", inverse: "ref/color/neutral/0" },
    "semantic/color/text/secondary": { light: "ref/color/neutral/600", inverse: "ref/color/neutral/100" },
    "semantic/color/text/tertiary": { light: "ref/color/neutral/400", inverse: "ref/color/neutral/200" },
    "semantic/color/text/inverse": { light: "ref/color/neutral/200", inverse: "ref/color/neutral/900" },
    "semantic/color/text/disabled": { light: "ref/color/neutral/300", inverse: "ref/color/neutral/600" },
    "semantic/color/text/brand": { light: "ref/color/brand/700", inverse: "ref/color/brand/50" },
    "semantic/color/text/accent": { light: "ref/color/accent/800", inverse: "ref/color/accent/200" },
    "semantic/color/text/onAccent": { light: "ref/color/neutral/0", inverse: "ref/color/neutral/900" },
    "semantic/color/text/danger": { light: "ref/color/feedback/error/600", inverse: "ref/color/feedback/error/200" },
    "semantic/color/text/dangerStrong": { light: "ref/color/feedback/error/300", inverse: "ref/color/feedback/error/300" },
    "semantic/color/text/onDanger": { light: "ref/color/neutral/0", inverse: "ref/color/neutral/900" },
    "semantic/color/text/onDangerMuted": { light: "ref/color/feedback/error/700", inverse: "ref/color/feedback/error/700" },
    "semantic/color/text/warning": { light: "ref/color/feedback/warning/800", inverse: "ref/color/feedback/warning/200" },
    "semantic/color/text/onWarning": { light: "ref/color/neutral/0", inverse: "ref/color/neutral/900" },
    "semantic/color/text/success": { light: "ref/color/feedback/success/700", inverse: "ref/color/feedback/success/200" },
    "semantic/color/text/onSuccess": { light: "ref/color/neutral/0", inverse: "ref/color/neutral/900" },
    "semantic/color/text/info": { light: "ref/color/feedback/info/700", inverse: "ref/color/feedback/info/200" },
    "semantic/color/text/onInfo": { light: "ref/color/neutral/0", inverse: "ref/color/neutral/900" },
    "semantic/color/text/linkDefault": { light: "ref/color/brand/600", inverse: "ref/color/brand/400" },
    "semantic/color/text/linkHover": { light: "ref/color/brand/700", inverse: "ref/color/brand/500" },
    "semantic/color/text/linkPressed": { light: "ref/color/brand/800", inverse: "ref/color/brand/600" },
    "semantic/color/text/onBrand": { light: "ref/color/neutral/0", inverse: "ref/color/neutral/900" },
  },
  bg: {
    "semantic/color/bg/surface": { light: "ref/color/neutral/0", inverse: "ref/color/white-alpha/200" },
    "semantic/color/bg/canvas": { light: "ref/color/neutral/50", inverse: "ref/color/neutral/800" },
    "semantic/color/bg/subtle": { light: "ref/color/neutral/100", inverse: "ref/color/white-alpha/100" },
    "semantic/color/bg/disabled": { light: "ref/color/neutral/300", inverse: "ref/color/neutral/700" },
    "semantic/color/bg/inverse": { light: "ref/color/neutral/900", inverse: "ref/color/neutral/0" },
    "semantic/color/bg/brand": { light: "ref/color/brand/700", inverse: "ref/color/brand/400" },
    "semantic/color/bg/brandSoft": { light: "ref/color/brand/100", inverse: "ref/color/white-alpha/100" },
    "semantic/color/bg/brandMuted": { light: "ref/color/brand/50", inverse: "ref/color/white-alpha/50" },
    "semantic/color/bg/accent": { light: "ref/color/accent/700", inverse: "ref/color/accent/400" },
    "semantic/color/bg/accentSoft": { light: "ref/color/accent/300", inverse: "ref/color/accent/300" },
    "semantic/color/bg/accentMuted": { light: "ref/color/accent/200", inverse: "ref/color/accent/200" },
    "semantic/color/bg/success": { light: "ref/color/feedback/success/500", inverse: "ref/color/feedback/success/400" },
    "semantic/color/bg/successSoft": { light: "ref/color/feedback/success/200", inverse: "ref/color/feedback/success/200" },
    "semantic/color/bg/successMuted": { light: "ref/color/feedback/success/100", inverse: "ref/color/feedback/success/100" },
    "semantic/color/bg/warning": { light: "ref/color/feedback/warning/500", inverse: "ref/color/feedback/warning/400" },
    "semantic/color/bg/warningSoft": { light: "ref/color/feedback/warning/200", inverse: "ref/color/feedback/warning/200" },
    "semantic/color/bg/warningMuted": { light: "ref/color/feedback/warning/100", inverse: "ref/color/feedback/warning/100" },
    "semantic/color/bg/danger": { light: "ref/color/feedback/error/600", inverse: "ref/color/feedback/error/400" },
    "semantic/color/bg/dangerSoft": { light: "ref/color/feedback/error/200", inverse: "ref/color/feedback/error/200" },
    "semantic/color/bg/dangerMuted": { light: "ref/color/feedback/error/100", inverse: "ref/color/feedback/error/100" },
    "semantic/color/bg/info": { light: "ref/color/feedback/info/500", inverse: "ref/color/feedback/info/400" },
    "semantic/color/bg/infoSoft": { light: "ref/color/feedback/info/200", inverse: "ref/color/feedback/info/200" },
    "semantic/color/bg/infoMuted": { light: "ref/color/feedback/info/100", inverse: "ref/color/feedback/info/100" },
    "semantic/color/bg/overlay": { light: "rgba(0,0,0,0/40)", inverse: "rgba(0,0,0,0/40)" },
  },
  border: {
    "semantic/color/border/subtle": { light: "ref/color/neutral/100", inverse: "ref/color/neutral/600" },
    "semantic/color/border/default": { light: "ref/color/neutral/200", inverse: "ref/color/neutral/500" },
    "semantic/color/border/strong": { light: "ref/color/neutral/300", inverse: "ref/color/neutral/400" },
    "semantic/color/border/emphasis": { light: "ref/color/neutral/400", inverse: "ref/color/neutral/300" },
    "semantic/color/border/inverse": { light: "ref/color/neutral/0", inverse: "ref/color/neutral/0" },
    "semantic/color/border/brand": { light: "ref/color/brand/700", inverse: "ref/color/brand/200" },
    "semantic/color/border/accent": { light: "ref/color/accent/400", inverse: "ref/color/accent/200" },
    "semantic/color/border/accentStrong": { light: "ref/color/accent/700", inverse: "ref/color/accent/300" },
    "semantic/color/border/focus": { light: "ref/color/feedback/info/400", inverse: "ref/color/feedback/info/300" },
    "semantic/color/border/info": { light: "ref/color/feedback/info/300", inverse: "ref/color/feedback/info/200" },
    "semantic/color/border/success": { light: "ref/color/feedback/success/300", inverse: "ref/color/feedback/success/200" },
    "semantic/color/border/warning": { light: "ref/color/feedback/warning/300", inverse: "ref/color/feedback/warning/200" },
    "semantic/color/border/danger": { light: "ref/color/feedback/error/600", inverse: "ref/color/feedback/error/200" },
    "semantic/color/border/dangerSoft": { light: "ref/color/feedback/error/300", inverse: "ref/color/feedback/error/200" },
    "semantic/color/border/disabled": { light: "ref/color/neutral/300", inverse: "ref/color/neutral/500" },
    "semantic/color/border/overlay": { light: "rgba(0,0,0,0/56)", inverse: "rgba(0,0,0,0/56)" },
  },
  icon: {
    "semantic/color/icon/primary": { light: "ref/color/neutral/900", inverse: "ref/color/neutral/0" },
    "semantic/color/icon/secondary": { light: "ref/color/neutral/600", inverse: "ref/color/neutral/100" },
    "semantic/color/icon/tertiary": { light: "ref/color/neutral/400", inverse: "ref/color/neutral/200" },
    "semantic/color/icon/disabled": { light: "ref/color/neutral/300", inverse: "ref/color/neutral/600" },
    "semantic/color/icon/inverse": { light: "ref/color/neutral/200", inverse: "ref/color/neutral/900" },
    "semantic/color/icon/brand": { light: "ref/color/brand/700", inverse: "ref/color/brand/50" },
    "semantic/color/icon/onBrand": { light: "ref/color/neutral/0", inverse: "ref/color/neutral/900" },
    "semantic/color/icon/accent": { light: "ref/color/accent/800", inverse: "ref/color/neutral/0" },
    "semantic/color/icon/onAccent": { light: "ref/color/neutral/900", inverse: "ref/color/neutral/900" },
    "semantic/color/icon/success": { light: "ref/color/feedback/success/700", inverse: "ref/color/feedback/success/200" },
    "semantic/color/icon/onSuccess": { light: "ref/color/neutral/0", inverse: "ref/color/neutral/900" },
    "semantic/color/icon/warning": { light: "ref/color/feedback/warning/800", inverse: "ref/color/feedback/warning/200" },
    "semantic/color/icon/onWarning": { light: "ref/color/neutral/0", inverse: "ref/color/neutral/900" },
    "semantic/color/icon/danger": { light: "ref/color/feedback/error/600", inverse: "ref/color/feedback/error/200" },
    "semantic/color/icon/dangerStrong": { light: "ref/color/feedback/error/700", inverse: "ref/color/feedback/error/300" },
    "semantic/color/icon/onDanger": { light: "ref/color/neutral/0", inverse: "ref/color/neutral/900" },
    "semantic/color/icon/info": { light: "ref/color/feedback/info/500", inverse: "ref/color/feedback/info/200" },
    "semantic/color/icon/onInfo": { light: "ref/color/neutral/0", inverse: "ref/color/neutral/900" },
  },
};

function rgbaAliasToHex(alias: string): string | null {
  const m = alias.match(/^rgba\(0,0,0,0\/(\d+)\)$/);
  if (!m) return null;
  const opacity = Number(m[1]) / 100;
  if (Number.isNaN(opacity)) return null;
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return `#000000${alpha}`;
}

export function resolveThemeAliasValue(alias: string): string {
  const rgbaHex = rgbaAliasToHex(alias);
  if (rgbaHex) return rgbaHex;
  return figmaColorTokens[alias] ?? figmaColorTokens[alias.replace("white-alpha", "white_alpha")] ?? "#00000000";
}
