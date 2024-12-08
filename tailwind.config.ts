import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scrollBehavior: {
        smooth: "smooth",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        grey: "#eee",
        greyPink: "#F5F1F2",
        red1: "#CF1259",
        darkRed: "#F11440",
        blush: "#E16691",
        pink: "#F2BAC9",
        lightLightGreen: "#A3D9A5",
        lightGreen: "#3B7D02",
        green: "#265818",
        darkGreen: "#173224",
      },
    },
  },
  plugins: [],
} satisfies Config;
