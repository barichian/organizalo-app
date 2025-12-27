// eslint-disable-next-line @typescript-eslint/no-require-imports
const sharedConfig = require("@plane/tailwind-config/tailwind.config.js");

module.exports = {
    presets: [sharedConfig],
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        // If using src directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "brand-yellow": "#FFCD00",
                "brand-blue": "#00247D",
                "brand-red": "#CF142B",
            },
            fontFamily: {
                sans: ["var(--font-outfit)", "sans-serif"],
            },
        },
    },
};
