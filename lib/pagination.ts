/**
 * Pagination calculator
 *
 * This module provides a utility to calculate visual page ranges for a single
 * editor instance by measuring top-level rendered block nodes in the DOM.
 *
 * Key points:
 * - We work with rendered DOM nodes because layout (wrapping, margins, images,
 *   custom styles) determines how much vertical space each block consumes.
 * - We only consider top-level block nodes (direct children of the editor root)
 *   because those correspond to logical blocks in ProseMirror (paragraphs,
 *   headings, lists, blockquotes, etc.).
 * - Heights are read via getBoundingClientRect() which provides pixel-accurate
 *   measurements in the current layout/zoom.
 * - We accumulate block heights until the page content height is exceeded, then
 *   start a new page. Blocks larger than a single page are assigned to a page
 *   on their own (visual-only pages — no splitting of nodes here).
 *
 * NOTE: Measuring must happen in the browser (client-side) after layout has
 * settled. When integrating, call this inside a requestAnimationFrame or after
 * layout-affecting updates so measurements are accurate.
 */

export type PageRange = {
  startIndex: number; // index (inclusive) of first block element on the page
  endIndex: number; // index (inclusive) of last block element on the page
};

/**
 * Calculate pagination ranges for the content inside `root`.
 *
 * @param root - The editor's root content element (the one containing block children)
 * @param pageContentHeightPx - The available content height (page height minus margins) in pixels
 * @returns Array of PageRange objects describing which block indices live on each visual page
 */
export function calculatePagination(root: HTMLElement, pageContentHeightPx: number): PageRange[] {
  const ranges: PageRange[] = [];

  if (!root) return ranges;

  // Collect direct child elements (top-level block nodes) only
  const children = Array.from(root.children).filter((n) => n.nodeType === Node.ELEMENT_NODE) as HTMLElement[];

  let currentStart = 0;
  let accumulated = 0;

  for (let i = 0; i < children.length; i++) {
    const el = children[i];

    // getBoundingClientRect is used to measure rendered height (includes margins, padding and borders as they affect layout)
    const rect = el.getBoundingClientRect();
    const height = Math.ceil(rect.height);

      // If the block itself exceeds page height, it will occupy a single page.
    // We do NOT split the node inside calculatePagination to avoid complex
    // document transformations that would break editing/undo semantics.
    // Instead, oversized blocks are placed on their own visual page with an
    // indicator (handled by the preview renderer). Splitting large blocks is a
    // future enhancement that must be handled carefully in ProseMirror.
    if (accumulated === 0 && height > pageContentHeightPx) {
      // Place this oversized block on its own page
      ranges.push({ startIndex: i, endIndex: i });
      // reset for next page
      currentStart = i + 1;
      accumulated = 0;
      continue;
    }

    // If adding this block fits on the current page, accumulate it
    if (accumulated + height <= pageContentHeightPx) {
      accumulated += height;
      continue;
    }

    // Otherwise, close the current page (i-1 is the last included block)
    ranges.push({ startIndex: currentStart, endIndex: i - 1 });

    // Start a new page containing this block
    currentStart = i;
    accumulated = height;

    // Edge case: if height > pageContentHeightPx (caught earlier only when accumulated===0),
    // handle here by immediately closing the oversized page.
    if (accumulated > pageContentHeightPx) {
      ranges.push({ startIndex: i, endIndex: i });
      currentStart = i + 1;
      accumulated = 0;
    }
  }

  // Push any remaining blocks as the final page
  if (currentStart < children.length) {
    ranges.push({ startIndex: currentStart, endIndex: children.length - 1 });
  }

  // If there are no children, return an empty page list (renderers may create an empty page visually)
  return ranges;
}
