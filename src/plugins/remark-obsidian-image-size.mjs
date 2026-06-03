import { visit } from "unist-util-visit";

export function rehypeObsidianImageSize() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "img") return;
      const alt = node.properties.alt;
      if (typeof alt !== "string" || !/^[1-9]\d*$/.test(alt)) return;

      node.properties.width = Number(alt);
      node.properties.alt = "";
    });
  };
}
