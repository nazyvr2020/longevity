import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/slices/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        opensans: ['var(--font-open-sans)'],
      },
      colors: {
        'color-primary': 'var(--brand-primary)',
        'color-secondary': 'var(--brand-secondary)',
        'color-neutral': 'var(--brand-neutral)',
        'color-base': 'var(--brand-base)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
export default config
