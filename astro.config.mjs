import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  
  adapter: node({
    mode: 'standalone', 
  }),

  integrations: [react()],
});