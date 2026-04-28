import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

if (typeof window !== "undefined") {
  const current = new URL(window.location.href);
  const storyPath = current.searchParams.get("path");
  if (storyPath && (storyPath.startsWith("/story/components-") || storyPath.startsWith("/story/primitives-"))) {
    current.searchParams.set("path", "/docs/foundations-color--docs");
    window.location.replace(current.toString());
  }
}

addons.setConfig({
  theme: themes.light,
});
