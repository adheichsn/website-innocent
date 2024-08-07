import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary01: "#495469",
        primary02: "#536484",
        primary03: "#63779C",
        primary04: "#94A2BC",
        neutral01: "#46494E",
        neutral02: "#55585E",
        neutral03: "#6B6E76",
        neutral04: "#DEDFE1",
        accent: "#ECF1F8",
      },
    },
  },
  plugins: [],
};
export default config;
