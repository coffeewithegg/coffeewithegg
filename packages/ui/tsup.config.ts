import { defineConfig } from "tsup";

export default defineConfig((config) => ({
  entryPoints: ["src/full-page.tsx", "src/scroll-button.tsx"],

  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  external: ["react"],
  ...config,
}));
