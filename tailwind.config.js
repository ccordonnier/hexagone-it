/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["dark"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  plugins: [require('daisyui'),],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#311212",

          "primary-content": "#ffd8d2",

          "secondary": "#38bdf8",

          "secondary-content": "#010d15",

          "accent": "#FFD700",

          "accent-content": "#161100",

          "neutral": "#350002",

          "neutral-content": "#d6c7c5",

          "base-100": "#0c0000",

          "base-200": "#0a0000",

          "base-300": "#020000",

          "base-content": "#ef4444",

          "info": "#3b82f6",

          "info-content": "#010615",

          "success": "#28A745",

          "success-content": "#010a02",

          "warning": "#f59e0b",

          "warning-content": "#150900",

          "error": "#DC3545",

          "error-content": "#110102",
        },
      }
    ]
  },
}