/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  presets: [require( "nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#cc0000ff",
        secondary: "#ff8484ff",
        accent: "#4b0d0dff",
        background: "#c0c0c06c",
        light: {
          100: "#FFFFFF",
          200: "#F9FAFB",
          300: "#F3F4F6",
        },
        dark: {
          100: "#111827",
          200: "#1F2937",
          300: "#374151",
        }
      },
    },
  },
  plugins: [],
}