// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const testimonials = defineCollection({
  loader: glob({pattern: "**/*.{md,mdx}", base: "./src/content/testimonials"}),
  schema: z.object({
    stars: z.number().min(1).max(5).int(), // Number of stars for the rating
    title: z.string(),                  // The bold title like "Exceptional Craftsmanship"
    author: z.string(),                 // The name of the person giving the testimonial
  }),
});

export const collections = { testimonials };