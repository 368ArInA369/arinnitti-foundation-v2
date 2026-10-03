import { copyFileSync, existsSync } from "node:fs";

/**
 * GitHub Pages has no rewrite rules, so /ru and /es — which are routes in the
 * browser, not files on disk — would return the default 404 page.
 *
 * Pages serves 404.html for any unmatched path. Making it a copy of index.html
 * means the app boots there and the router reads the real URL, so the page the
 * visitor asked for renders. The HTTP status is still 404, which is fine for a
 * preview build but worth knowing if this ever becomes the primary site.
 */
const source = "dist/index.html";
const target = "dist/404.html";

if (!existsSync(source)) {
  console.error(`spa-fallback: ${source} not found — did the build run?`);
  process.exit(1);
}

copyFileSync(source, target);
console.log(`spa-fallback: wrote ${target}`);
