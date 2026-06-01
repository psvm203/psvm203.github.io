import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINK_RE = /\[([^\]]*)\]\((\.\.\/[^/]+\/index\.md)\)/g;

function getTitleFromPost(linkPath) {
  try {
    const filePath = join(process.cwd(), "src/content/posts", linkPath.slice("../".length));
    const content = readFileSync(filePath, "utf8");
    const match = content.match(/^title:\s*(.+)$/m);
    return match ? match[1].trim() : null;
  } catch {
    return null;
  }
}

const files = process.argv.slice(2);
let anyChanged = false;

for (const file of files) {
  const original = readFileSync(file, "utf8");
  const updated = original.replace(LINK_RE, (_, _anchorText, linkPath) => {
    const title = getTitleFromPost(linkPath);
    return title ? `[${title}](${linkPath})` : _;
  });

  if (updated !== original) {
    writeFileSync(file, updated);
    execSync(`git add ${JSON.stringify(file)}`);
    anyChanged = true;
  }
}

if (anyChanged) process.exit(1);
