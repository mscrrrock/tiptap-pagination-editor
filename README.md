# Tiptap Pagination Editor — Prototype

This project is a prototype document editor built using Next.js and Tiptap, with a focus on print-accurate pagination, clean UX, and a maintainable architecture.

### Approach to Page Breaks

The editor uses a single continuous editing surface instead of simulating physical page breaks in JavaScript.

Pagination is handled by the browser at print time using CSS print rules (for example: @page size set to Letter with fixed margins).

Rationale:
- Browsers already handle pagination accurately for print.
- Text wrapping, fonts, spacing, and images behave exactly as they will in the final printed output.
- This avoids fragile JavaScript-based height calculations that often drift from real print layout.

This ensures that what the user edits is exactly what gets printed, without maintaining multiple document representations.

### Trade-offs and Limitations

- Page breaks are not visually rendered during editing.
- Page numbers are not calculated on screen.
- The editor behaves as a continuous document (similar to Google Docs), rather than a paged Word-style view.

These trade-offs were made deliberately to prioritize correctness, simplicity, and long-term maintainability.

### What I Would Improve With More Time

- Optional visual page guides to indicate approximate print boundaries.
- CSS-based page numbers rendered only at print time.
- More advanced toolbar UX such as active formatting states and keyboard shortcut hints.
- Support for document templates such as resumes, reports, or essays.

### Summary

This prototype prioritizes a single source of truth for layout and pagination. By delegating pagination to the browser’s print engine instead of duplicating layout logic in JavaScript, the editor remains predictable, accurate, and easy to extend.

