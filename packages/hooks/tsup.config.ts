import { defineConfig } from "tsup";

export default defineConfig((config) => ({
  entryPoints: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  external: ["react"],
  ...config,
}));
