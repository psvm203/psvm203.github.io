import { readFileSync } from "node:fs";
import { join } from "node:path";
import { visit } from "unist-util-visit";

export function remarkObsidianLinks() {
  return (tree) => {
    visit(tree, "link", (node) => {
      const { url } = node;
      if (!url.startsWith("../") || !url.endsWith("/index.md")) return;

      const slug = url.slice("../".length, -"/index.md".length);

      let title = slug;
      try {
        const content = readFileSync(
          join(process.cwd(), "src/content/posts", url.slice("../".length)),
          "utf8",
        );
        const match = content.match(/^title:\s*(.+)$/m);
        if (match) title = match[1].trim();
      } catch {
        // keep slug as fallback
      }

      node.url = slug;
      node.children = [{ type: "text", value: title }];
    });
  };
}
