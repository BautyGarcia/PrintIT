import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxs: { raw: "(max-width: 290px)" },
      xs: { raw: "( max-width: 320px )" },
      sm: { raw: "( max-width: 640px )" },
      ms: { raw: "( max-width: 769px )" },
      md: { raw: "( max-width: 894px )" },
      lg: { raw: "( max-width: 1024px )" },
      xl: { raw: "(max-width: 1280px)" },
      custom: { raw: "( max-width: 1680px )" },
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
