/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // --- backgrounds (dark navy family) ---
        night: {
          950: 'rgb(var(--n-950) / <alpha-value>)', // page background (primary dark)
          925: 'rgb(var(--n-925) / <alpha-value>)', // table headers, sticky cells
          900: 'rgb(var(--n-900) / <alpha-value>)', // cards, panels
          850: 'rgb(var(--n-850) / <alpha-value>)', // image placeholders
          800: 'rgb(var(--n-800) / <alpha-value>)',
          700: 'rgb(var(--n-700) / <alpha-value>)', // scrollbars, strong lines
        },
        // --- cream/light text family ---
        violet: {
          50: 'rgb(var(--v-50) / <alpha-value>)',
          100: 'rgb(var(--v-100) / <alpha-value>)',
          200: 'rgb(var(--v-200) / <alpha-value>)',
          300: 'rgb(var(--v-300) / <alpha-value>)',
          400: 'rgb(var(--v-400) / <alpha-value>)',
          500: 'rgb(var(--v-500) / <alpha-value>)',
          600: 'rgb(var(--v-600) / <alpha-value>)',
          700: 'rgb(var(--v-700) / <alpha-value>)',
          800: 'rgb(var(--v-800) / <alpha-value>)',
          900: 'rgb(var(--v-900) / <alpha-value>)',
          950: 'rgb(var(--v-950) / <alpha-value>)',
        },
        // --- accent (light orange family) ---
        brand: {
          950: 'rgb(var(--b-950) / <alpha-value>)',
          900: 'rgb(var(--b-900) / <alpha-value>)',
          800: 'rgb(var(--b-800) / <alpha-value>)',
          700: 'rgb(var(--b-700) / <alpha-value>)',
          600: 'rgb(var(--b-600) / <alpha-value>)',
          500: 'rgb(var(--b-500) / <alpha-value>)',
          400: 'rgb(var(--b-400) / <alpha-value>)',
          300: 'rgb(var(--b-300) / <alpha-value>)',
          200: 'rgb(var(--b-200) / <alpha-value>)',
          100: 'rgb(var(--b-100) / <alpha-value>)',
          50: 'rgb(var(--b-50) / <alpha-value>)',
        },
        // --- semantic helpers (solid, flat) ---
        line: 'rgb(var(--line) / <alpha-value>)',
        'line-strong': 'rgb(var(--line-strong) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--ink-2) / <alpha-value>)',
        'ink-3': 'rgb(var(--ink-3) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}