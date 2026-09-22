/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0a0b08",
          surface: "#14160f",
          raised: "#1c1f15",
        },
        primary: {
          DEFAULT: "#6b8e23",
          bright: "#8bb52e",
        },
        secondary: "#3f4b23",
        cta: {
          bg: "#6b8e23",
          text: "#0d0f07",
        },
        text: {
          primary: "#ffffff",
          secondary: "#c7c7bd",
          tertiary: "#8f9484",
        },
        border: {
          subtle: "rgba(255,255,255,0.08)",
          strong: "#5c6350",
        },
        focusring: "#a3d13a",
        danger: "#ef4444",
        success: "#8bb52e",
        /* Aviso (atenção, não erro). Contraste 7.4:1 sobre bg-raised. */
        warning: "#d9a441",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Outfit", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        card: "0 4px 16px rgba(0,0,0,0.35)",
        "card-hover": "0 8px 28px rgba(0,0,0,0.45)",
        cta: "0 6px 20px rgba(107,142,35,0.25)",
      },
      spacing: {
        18: "4.5rem",
      },
      transitionTimingFunction: {
        std: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
