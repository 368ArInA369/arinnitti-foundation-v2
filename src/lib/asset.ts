/**
 * Resolve a public-directory asset against the deploy base path.
 *
 * GitHub Pages serves from /arinnitti-foundation-v2/, so a bare "/images/x.webp"
 * would 404. `import.meta.env.BASE_URL` is whatever `base` is set to in
 * vite.config.ts, with a trailing slash.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

/** The base path without its trailing slash: "" at root, "/repo" on Pages. */
export const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
