import { definePlugin } from "@expressive-code/core";
import type { Element, ElementContent } from "hast";

const HIDDEN_LANGUAGES = new Set(["plaintext", "text", "txt", "ansi", ""]);

function findHeader(node: ElementContent): Element | undefined {
  if (node.type !== "element") return undefined;
  const className = node.properties?.className;
  const classes = Array.isArray(className) ? className : [className];
  if (node.tagName === "figcaption" && classes.includes("header")) {
    return node;
  }
  for (const child of node.children) {
    const found = findHeader(child);
    if (found) return found;
  }
  return undefined;
}

export function pluginLanguageBadge() {
  return definePlugin({
    name: "Language Badge",
    hooks: {
      postprocessRenderedBlock: ({ codeBlock, renderData }) => {
        const language = codeBlock.language?.toLowerCase();
        if (!language || HIDDEN_LANGUAGES.has(language)) return;

        const header = findHeader(renderData.blockAst);
        if (!header) return;

        header.children.push({
          type: "element",
          tagName: "span",
          properties: {
            className: ["language-badge"],
            "aria-hidden": "true",
          },
          children: [{ type: "text", value: language }],
        });
      },
    },
    // @ts-expect-error - cssVar is untyped in the plugin context
    baseStyles: ({ _cssVar }) => `
      .frame.is-terminal .header .language-badge {
        position: absolute;
        left: 3.6rem;
        top: 50%;
        transform: translateY(-50%);
        z-index: 3;
        pointer-events: none;
        font-family: "JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 0.7rem;
        font-weight: 700;
        line-height: 1;
        letter-spacing: 0.08ch;
        text-transform: uppercase;
        color: oklch(0.78 0.11 var(--hue));
      }
    `,
  });
}
