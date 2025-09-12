import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F2940",
          orange: "#F59E0B"
        }
      },
      boxShadow: {
        soft: "0 8px 30px rgba(15,41,64,0.07)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};
export default config;
