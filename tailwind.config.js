/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        product: {
          main: "#00875F",
          light: "#00B37E",
        },
        base: {
          gray: {
            1: "#121214",
            2: "#202024",
            3: "#8D8D99",
            4: "#C4C4CC",
            5: "#E1E1E6",
          },
        },
      },
      boxShadow: {
        card: "0px 0px 60px 0px rgba(0, 0, 0, 0.80)",
      },
      maxWidth: {
        container: "calc(100vw - ((100vw - 1180px) / 2))",
      },
      fontSize: {
        base: ["1.125rem", "160%"],
        lg: ["1.25rem", "160%"],
        xl: ["1.5rem", "160%"],
        "2xl": ["2rem", "160%"],
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translateX(100%)" },
          to: { opacity: 1, transform: "translate(0)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "product-gradient": "linear-gradient(180deg, #1EA483 0%, #7465D4 100%)",
      },
    },
  },
  plugins: [],
};
