import { visit } from "unist-util-visit";

export function rehypeObsidianImageSize() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "img") return;
      const alt = node.properties.alt;
      if (typeof alt !== "string" || !/^[1-9]\d*$/.test(alt)) return;

      const width = Number(alt);
      // Astro's image service downscales the generated asset to the `width`
      // attribute, which is blurry on high-DPI screens. Render the asset at 2x
      // and constrain the displayed size with CSS so the source stays sharp.
      node.properties.width = width * 2;
      node.properties.style = `width:${width}px;height:auto;${node.properties.style ?? ""}`;
      node.properties.alt = "";
    });
  };
}
