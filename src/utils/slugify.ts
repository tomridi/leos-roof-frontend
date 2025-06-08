export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s\W-]+/g, '-') // replace spaces & non-word characters with -
    .replace(/^-+|-+$/g, ''); // trim leading/trailing dashes
}