import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  theme: {
    screens: {
      mobile: { max: "480px" },
      tablet: { min: "481px", max: "1023px" },
      laptop: { min: "1024px", max: "1439px" },
      desktop: { min: "1440px" },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",

      gradientBackground: "#2F13AA",
      gradientSecondary: "#244DC4",
      gradientSupporting: "#6CB6A6",

      background: "#001C63",
      foreground: "#132A97",
      primary: "#2240CD",

      grey01: "#8992C7",
      grey02: "#ABB2D9",
      grey03: "#D0D4EA",
      grey04: "#E9ECFA",
      grey05: "#F2F4FD",

      bg01: "#F4F6F7",
      bg02: "#E5E5E5",

      white: "#FFFFFF",
      black: "#000000",

      error: "#D7004D",
      bgError: "#FFF8FA",

      warning: "#EFECFB",
      warning02: "#633FDA",
      warning03: "#FFC807",

      danger01: "#DE180B",
      danger02: "#C0160B",

      success: "#00714F",
      bgSuccess: "#F3FAF7",

      bgFail: "#FFF3F6",

      highlight: "#FFC807",
      bgHighlight: "rgba(255, 200, 7, 0.12)",

      partial: "#866800",
      bgPartial: "#FFF7DD",
    },
  },
  plugins: [],
};

export default config;
