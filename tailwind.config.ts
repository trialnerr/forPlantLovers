import type { Config } from "tailwindcss";

export default {
 content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scrollBehavior: {
        smooth: "smooth",
      },
    },
  },
  plugins: [],
} satisfies Config;
