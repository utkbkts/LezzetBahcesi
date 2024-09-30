/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "500px", // Small breakpoint'i 500px'e ayarladık
        md: "768px", // Medium breakpoint'i koruduk (768px)
        mds: "978px",
        lg: "1200px", // Large breakpoint'i koruduk (1024px)
        xl: "1350px", // X-Large breakpoint'i koruduk (1280px)
        "2xl": "1536px", // 2X-Large breakpoint'i koruduk (1536px)
        custom: "1440px", // Özel bir breakpoint ekledik (1440px)
      },
    },
  },
  plugins: [],
};
