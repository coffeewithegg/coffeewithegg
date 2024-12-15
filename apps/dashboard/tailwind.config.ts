import sharedConfig from "@cwe/tailwind-config";
import { type Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./app/**/*.{html,ts,tsx}"],
  presets: [sharedConfig],
};

export default config;
