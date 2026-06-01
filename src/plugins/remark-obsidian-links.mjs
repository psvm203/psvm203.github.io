import { readFileSync } from "node:fs";
import { join } from "node:path";
import { visit } from "unist-util-visit";

export function remarkObsidianLinks() {
  return (tree) => {
    visit(tree, "link", (node) => {
      const { url } = node;
      if (!url.startsWith("posts/") || !url.endsWith("/index.md")) return;

      const slug = url.slice("posts/".length, -"/index.md".length);

      let title = slug;
      try {
        const content = readFileSync(
          join(process.cwd(), "src/content", url),
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
