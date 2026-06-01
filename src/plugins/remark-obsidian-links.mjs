import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { visit } from "unist-util-visit";

const POSTS_DIR = fileURLToPath(new URL("../content/posts/", import.meta.url));

export function remarkObsidianLinks() {
  return (tree) => {
    visit(tree, "link", (node) => {
      const { url } = node;
      if (!url.startsWith("../") || !url.endsWith("/index.md")) return;

      const slug = url.slice("../".length, -"/index.md".length);

      const originalText = node.children.map((c) => c.value ?? "").join("") || slug;
      let title = originalText;
      try {
        const content = readFileSync(
          join(POSTS_DIR, url.slice("../".length)),
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
