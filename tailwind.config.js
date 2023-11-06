// tailwind.config.js
import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#f0fae3",
              100: "#F2FBDA",
              200: "#E2F8B7",
              300: "#C8EB8F",
              400: "#AAD86E",
              500: "#83BE42",
              600: "#67A330",
              700: "#4D8821",
              800: "#376E15",
              900: "#265B0C",
              DEFAULT: "#83BE42",
            }

          }
        },
        dark: {
          colors: {
            primary: {
              500: "#83BE42",
              600: "#67A330",
              700: "#4D8821",
              800: "#376E15",
              900: "#265B0C",
              foreground: "#0070f3",
              DEFAULT: "#0070f3",
            }
          }
        }
      }
    })
  ],
}