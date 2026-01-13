# Tiptap Pagination Editor — Prototype

This project is a prototype document editor built using **Next.js** and **Tiptap**, focused on print-accurate pagination, clean UX, and a maintainable architecture.

---

## Approach to Page Breaks

The editor uses a **single continuous editing surface** instead of simulating physical page breaks in JavaScript.

Pagination is handled by the browser at print time using CSS:

```css
@page {
  size: Letter;
  margin: 1in;
}
->Why this approach?
Browsers already handle pagination accurately for print.

Text wrapping, fonts, spacing, and images behave exactly as they will in the final printed output.

Avoids fragile JavaScript-based height calculations that often drift from real print layout.

This ensures that what the user edits is exactly what gets printed, without maintaining multiple document representations.

->Trade-offs and Limitations
Page breaks are not visually rendered during editing.

Page numbers are not calculated on screen.

The editor behaves as a continuous document (similar to Google Docs), rather than a paged Word-style view.

These trade-offs were made deliberately to prioritize correctness, simplicity, and long-term maintainability.

->What I Would Improve With More Time
Optional visual page guides to indicate approximate print boundaries.

CSS-based page numbers rendered only at print time.

More advanced toolbar UX (active formatting states, keyboard shortcut hints).

Support for document templates (resume, report, essay).

Summary
This prototype prioritizes a single source of truth for layout and pagination.
By delegating pagination to print CSS instead of duplicating layout logic in JavaScript, the editor remains predictable, accurate, and easy to extend.

