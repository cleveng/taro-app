/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./public/index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {}
  },
  plugins: []
}

export default config
