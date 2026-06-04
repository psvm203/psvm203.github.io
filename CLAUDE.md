## About This Repository

This repository is a blog with the following workflow:

- **Edit**: Markdown files are authored and edited in [Obsidian](https://obsidian.md).
- **Build**: [Astro](https://astro.build) builds the site from the Markdown content.
- **Deploy**: The built site is deployed to GitHub Pages.

---

# Astro Usage Guide

**Always consult 'astro-docs' MCP server for code examples and latest API.**
Astro is the web framework for content-driven websites.

---

## Git Hooks (lefthook)

[lefthook](https://github.com/evilmartians/lefthook) manages git hooks. It is installed automatically via the `postinstall` script. Configuration lives in `lefthook.yml`.

- **pre-commit**:
  - `format` - Runs `dprint fmt` and re-stages fixed files.
  - `update-anchor-text` - Runs `scripts/update-anchor-text.js` on staged `*.md` files and re-stages them.
- **prepare-commit-msg**:
  - `auto-commit-msg` - Runs `scripts/auto-commit-msg.sh` to generate the commit message.

---

## Quick Reference

### File Location

CLI looks for `astro.config.js`, `astro.config.mjs`, `astro.config.cjs`, and `astro.config.ts` in: `./`. Use `--config` for custom path.

### CLI Commands

This project uses pnpm.

- `pnpm dev` - Start the development server.
- `pnpm build` - Build your project and write it to disk.
- `pnpm check` - Check your project for errors.
- `pnpm lint` - Lint code for quality issues.

**Re-run after adding/changing plugins.**

### Project Structure

Reference [project structure docs](https://docs.astro.build/en/basics/project-structure).

- `src/*` - Project source code (components, pages, styles, images, etc.)
- `src/content` - The Obsidian vault; Markdown content is edited here in Obsidian.
- `src/pages` - Defines all pages and routes.
- `src/components` - Components.
- `src/layouts` - Layout components.
- `src/styles` - CSS/Sass files.
- `public/*` - Non-code, unprocessed assets (fonts, icons, etc.); copied as-is to build output.
- `package.json` - Project manifest.
- `astro.config.mjs` - Astro configuration file.
- `tsconfig.json` - TypeScript configuration file.

## Do / Don't

### Do

- Let dprint handle all formatting; rely on the format pre-commit hook.
- Validate changes with pnpm check && pnpm build before committing.
- Consult the astro-docs MCP server for Astro APIs, integrations, and content collection schemas.

### Don't

- Don't manually reformat code files.
