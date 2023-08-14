/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue, js, ts, jsx, tsx}",
  ],
  theme: {
    extend: {},
    borderRadius: {
      'none': '0',
      'sm': '0.25rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.5rem',
      'lg': '1rem',
      'full': '9999px',
      'large': '12px',
    }
  },
  plugins: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
}