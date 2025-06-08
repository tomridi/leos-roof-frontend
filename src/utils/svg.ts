// src/utils/svg.ts (or directly in ServicesGrid.tsx for now)

/**
 * A simple helper function to extract common attributes and inner HTML from an SVG string.
 * This function expects a well-formed SVG string including the <svg> wrapper.
 * For more complex SVGs or robust error handling, consider a dedicated SVG parsing library.
 *
 * @param svgString The raw SVG string (e.g., "<svg viewBox=...><path...></svg>")
 * @returns An object containing extracted attributes and the inner HTML of the SVG.
 */
export function parseSvgString(svgString: string) {
  // Regex to find the <svg> tag and capture its attributes and inner content
  const svgMatch = svgString.match(/<svg([^>]*)>([\s\S]*?)<\/svg>/i);

  if (!svgMatch) {
    console.warn("Invalid SVG string format:", svgString);
    return { attributes: {}, innerHTML: '' };
  }

  const attributesString = svgMatch[1]; // String containing attributes (e.g., 'viewBox="..." fill="..."')
  const innerHTML = svgMatch[2];       // Content inside <svg>...</svg>

  const attributes: { [key: string]: string } = {};
  // Regex to find attribute pairs (key="value" or key='value')
  const attrRegex = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
  let match;
  while ((match = attrRegex.exec(attributesString)) !== null) {
    // Convert kebab-case attributes to camelCase for React props if necessary (e.g., stroke-width to strokeWidth)
    const key = match[1].replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    attributes[key] = match[2];
  }

  // Remove the 'class' attribute if it's present in the extracted attributes
  // This ensures your frontend classes take precedence.
  delete attributes.class;
  delete attributes.className; // In case it's camelCase

  return { attributes, innerHTML };
}