const POSTS_PATH = "posts";

module.exports = async ({ quickAddApi: { inputPrompt }, app }) => {
  const slug = await inputPrompt("슬러그 입력");
  if (!slug?.trim()) return;

  const sanitized = slug.trim().toLowerCase().replace(/\s+/g, "-");
  const filePath = `${POSTS_PATH}/${sanitized}/index.md`;

  if (await app.vault.adapter.exists(filePath)) {
    new Notice(`Already exists: ${filePath}`);
    return;
  }

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const published = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  const content = `---
title:
published: ${published}
description:
tags: []
category:
---
`;

  await app.vault.adapter.mkdir(`${POSTS_PATH}/${sanitized}`);
  const file = await app.vault.create(filePath, content);
  app.workspace.getLeaf(false).openFile(file);
};
