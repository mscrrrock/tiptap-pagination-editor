# tiptap-pagination-editor

Minimal Next.js 14 + TypeScript prototype with Tailwind CSS and Tiptap editor.

Quick start:

1. Install dependencies

   npm install

2. Start dev server

   npm run dev

Notes:
- Editor is client-only; we load it with dynamic import ({ ssr: false }) from `app/page.tsx`.
- The editor logic (extensions, default content) lives in `lib/editor-config.ts` to keep UI and logic separated.
