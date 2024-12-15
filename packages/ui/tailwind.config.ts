import sharedConfig from "@cwe/tailwind-config";
import { type Config } from "tailwindcss";

const config: Pick<Config, "prefix" | "content" | "presets"> = {
  content: ["./src/**/*.{html,ts,tsx}"],
  prefix: "ui-",
  presets: [sharedConfig],
};

export default config;
