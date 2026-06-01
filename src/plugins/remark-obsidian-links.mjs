import { readFileSync } from "fs";
import { basename, dirname, resolve } from "path";
import { visit } from "unist-util-visit";

function extractTitle(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (match) {
      const titleMatch = match[1].match(/^title:\s*(.+)$/m);
      if (titleMatch) return titleMatch[1].trim();
    }
  } catch {}
  return null;
}

export function remarkObsidianLinks() {
  return (tree, file) => {
    const dir = dirname(file.path);

    visit(tree, "link", (node) => {
      if (!node.url.endsWith(".md")) return;

      const stem = basename(node.url, ".md");
      if (
        node.children.length === 1
        && node.children[0].type === "text"
        && node.children[0].value === stem
      ) {
        const title = extractTitle(resolve(dir, node.url));
        if (title) node.children[0].value = title;
      }

      node.url = node.url.replace(/\/index\.md$/, "").replace(/\.md$/, "");
    });
  };
}
