import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0A',
        secondary: '#141414',
        accent: '#1E1E1E',
        gold: '#D4AF37',
        'gold-light': '#F4E4BC',
      },
    },
  },
  plugins: [],
}
export default config
