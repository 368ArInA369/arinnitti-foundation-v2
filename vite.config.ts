import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

/**
 * GitHub Pages serves this project from a subpath:
 *   https://368arina369.github.io/arinnitti-foundation-v2/
 *
 * So every asset URL and the router's basename have to carry that prefix.
 * Override with BASE_PATH=/ when deploying somewhere that serves from root
 * (a custom domain, Cloudflare, your own server).
 */
const base = process.env.BASE_PATH ?? "/arinnitti-foundation-v2/";

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: { host: "127.0.0.1", port: 5190 },
});
