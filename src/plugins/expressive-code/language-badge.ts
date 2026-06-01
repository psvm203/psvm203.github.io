import { definePlugin } from "@expressive-code/core";
import { h } from "hastscript";

export function pluginLanguageBadge() {
  return definePlugin({
    name: "Language Badge",
    hooks: {
      postprocessRenderedBlock({ codeBlock, renderData }) {
        const lang = codeBlock.language;
        if (!lang) return;

        const figure = renderData.blockAst;
        const header = figure.children?.find(
          (child) => child.type === "element" && child.tagName === "figcaption",
        );

        if (!header) return;

        // @ts-expect-error
        header.children.push(h("span.language-badge", lang));
      },
    },
    baseStyles: `
      .header {
        position: relative;
      }
      .language-badge {
        position: absolute;
        left: 4rem;
        top: 50%;
        transform: translateY(-50%);
        font-family: "JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo,
          Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: oklch(0.65 0.12 var(--hue));
        pointer-events: none;
      }
      .has-title .language-badge {
        display: none;
      }
    `,
  });
}
