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
            },
            secondary: {
              50: "#f0f0fa",
              100: "#EDEDF8",
              200: "#D8D8F2",
              300: "#BEBEE8",
              400: "#9F9FE0",
              500: "#7A7AD4",
              600: "#5F5FC9",
              700: "#4545BD",
              800: "#3030B3",
              900: "#1F1FAA",
              DEFAULT: "#7A7AD4",
            }


          }
        },
        dark: {
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
            },
            secondary: {
              50: "#f0f0fa",
              100: "#EDEDF8",
              200: "#D8D8F2",
              300: "#BEBEE8",
              400: "#9F9FE0",
              500: "#7A7AD4",
              600: "#5F5FC9",
              700: "#4545BD",
              800: "#3030B3",
              900: "#1F1FAA",
              DEFAULT: "#7A7AD4",
            }
          }
        }
      }
    })
  ],
}