#!/usr/bin/env node
import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { basename, dirname, resolve } from "path";

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

for (const file of process.argv.slice(2)) {
  let content = readFileSync(file, "utf8");
  const dir = dirname(file);

  content = content.replace(/\[([^\]]+)\]\(([^)]+\.md)\)/g, (match, text, linkPath) => {
    const stem = basename(linkPath, ".md");
    let newText = text;

    if (text === stem) {
      const title = extractTitle(resolve(dir, linkPath));
      if (title) newText = title;
    }

    const newPath = linkPath.replace(/\/index\.md$/, "").replace(/\.md$/, "");
    return `[${newText}](${newPath})`;
  });

  writeFileSync(file, content);
  execSync(`git add ${JSON.stringify(file)}`);
}
