'use client';

import React from 'react';
import type { Editor } from '@tiptap/core';

export default function LeftRail({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const btn =
    'w-10 h-10 flex items-center justify-center ' +
    'rounded-md border border-slate-300 ' +
    'text-slate-700 bg-white ' +
    'hover:bg-slate-100 hover:text-slate-900 ' +
    'active:scale-95 transition';

  return (
    <aside
      className="hidden-print"
      style={{
        position: 'fixed',
        top: 88,                     // sits cleanly below title
        left: 0,
        width: 64,                   // thinner rail
        height: 'calc(100vh - 88px)',
        background: '#e9edf3',       // light gray-blue (high contrast)
        borderRight: '1px solid #cbd5e1',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          marginTop: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {/* Bold */}
        <button
          className={btn}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M7 5h6a4 4 0 010 8H7zm0 8h7a4 4 0 010 8H7z"
              fill="currentColor"
            />
          </svg>
        </button>

        {/* Italic */}
        <button
          className={btn}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M10 4h8v2h-3l-4 12h3v2H6v-2h3l4-12h-3z"
              fill="currentColor"
            />
          </svg>
        </button>

        {/* Bullet list */}
        <button
          className={btn}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bulleted list"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <circle cx="6" cy="7" r="1.5" fill="currentColor" />
            <circle cx="6" cy="12" r="1.5" fill="currentColor" />
            <circle cx="6" cy="17" r="1.5" fill="currentColor" />
            <rect x="9" y="6" width="10" height="2" fill="currentColor" />
            <rect x="9" y="11" width="10" height="2" fill="currentColor" />
            <rect x="9" y="16" width="10" height="2" fill="currentColor" />
          </svg>
        </button>

        <div style={{ height: 1, background: '#cbd5e1', margin: '6px 0' }} />

        {/* H1 */}
        <button
          className={btn}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title="Heading 1"
        >
          <span className="text-xs font-semibold">H1</span>
        </button>

        {/* H2 */}
        <button
          className={btn}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
          <span className="text-xs font-semibold">H2</span>
        </button>

        <div style={{ height: 1, background: '#cbd5e1', margin: '6px 0' }} />

        {/* Print */}
        <button
          className={btn}
          onClick={() => window.print()}
          title="Print"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M6 9V4h12v5H6zm12 2h2a2 2 0 012 2v5h-4v-3H6v3H2v-5a2 2 0 012-2h2"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}






