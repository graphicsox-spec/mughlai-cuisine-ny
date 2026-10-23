/**
 * Clean text utility to ensure natural, standard spacing.
 * Modern CSS (text-wrap: balance / pretty) handles orphans natively.
 */
export function preventOrphans(text) {
  if (!text || typeof text !== 'string') return '';
  return text.trim().replace(/\s+/g, ' ');
}

/**
 * Normalizes headings with clean, standard word spacing.
 */
export function balanceHeading(text) {
  if (!text || typeof text !== 'string') return '';
  return text.trim().replace(/\s+/g, ' ');
}

