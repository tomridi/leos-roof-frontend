import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
      server: {
        port: process.env.PORT || 3000, // Default to 3000 if PORT is not set
        host: true // Bind to 0.0.0.0
    }
  },
  
  adapter: node({
    mode: 'standalone',
    hostname: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  }),

  integrations: [react()],
});