import { defineConfig } from "tsup";

export default defineConfig((config) => ({
  entry: {
    misc: "src/misc/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  external: ["react"],
  ...config,
}));
