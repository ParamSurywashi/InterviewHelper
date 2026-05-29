import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: { inter: ['Inter','sans-serif'] },
      boxShadow: { base:'0px 4px 24px rgba(0,0,0,0.06)', base2:'0px 4px 24px rgba(0,0,0,0.04)' },
    },
  },
  plugins: [],
}
export default config