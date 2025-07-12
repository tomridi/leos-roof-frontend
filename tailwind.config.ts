// tailwind.config.js
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        'test': '#ff00ff',
        primary: '#B0978A',
      },
      brightness: {
        50: '.5',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};

export default config;
