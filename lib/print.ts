/**
 * Print / Page size constants
 *
 * We use a 96 DPI browser assumption to convert inches to pixels for the on-screen
 * preview. Converting using DPI = 96 gives:
 *  - Width (8.5in)  -> 8.5 * 96 = 816px
 *  - Height (11in)  -> 11 * 96  = 1056px
 *  - Margin (1in)   -> 1 * 96   = 96px
 *
 * Why use DPI-based pixel values?
 * - CSS absolute units (like `in`) are not reliably mapped to device units across
 *   different browsers/devices and can produce inconsistent visual sizes when
 *   previewing documents on screen.
 * - For a predictable on-screen representation of a print page (what users see in
 *   a Google Docs-like editor), converting inches to pixels using a fixed DPI is
 *   pragmatic and consistent for typical browser environments.
 * - Note: for final printed output you should still use proper print CSS and
 *   consider the printer's DPI and print media settings.
 */

export const DPI = 96; // Browser DPI assumption for on-screen preview
export const LETTER_WIDTH_IN = 8.5;
export const LETTER_HEIGHT_IN = 11;
export const PAGE_MARGIN_IN = 1; // 1 inch margins

export const PAGE_WIDTH_PX = Math.round(LETTER_WIDTH_IN * DPI); // 816
export const PAGE_HEIGHT_PX = Math.round(LETTER_HEIGHT_IN * DPI); // 1056
export const PAGE_MARGIN_PX = Math.round(PAGE_MARGIN_IN * DPI); // 96

// Expose an explicit page padding constant (alias for margin) so components can
// use a single source-of-truth for both screen and print layout.
export const PAGE_PADDING_PX = PAGE_MARGIN_PX;

export const CONTENT_WIDTH_PX = PAGE_WIDTH_PX - PAGE_PADDING_PX * 2;
export const CONTENT_HEIGHT_PX = PAGE_HEIGHT_PX - PAGE_PADDING_PX * 2;

export function pageStylePx() {
  return {
    width: `${PAGE_WIDTH_PX}px`,
    height: `${PAGE_HEIGHT_PX}px`,
    padding: `${PAGE_PADDING_PX}px`,
  } as const;
}
