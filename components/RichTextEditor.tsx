'use client';

import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import type { Editor } from '@tiptap/core';
import { getDefaultExtensions} from '../lib/editor-config';
import EditorToolbar from './EditorToolbar';

/**
 * RichTextEditor
 * - Client component only (uses `use client` directive)
 * - Initializes the editor using a small, testable hook pattern
 * - UI and editor logic are separated: editor options come from `lib/editor-config`
 *
 * Pagination integration notes:
 * - We measure top-level DOM blocks using `getBoundingClientRect` to derive page ranges
 * - Measurements must happen after layout updates; we use requestAnimationFrame when recalculating
 */

export default function RichTextEditor({ initialContent = "", }: { initialContent?: string }) {
  // Initialize editor with options from a separate module.
  // Keeping all TipTap imports inside client components prevents accidental server bundling.
  const editor = useEditor({
    extensions: getDefaultExtensions(),
    content: "",
    editorProps: {
      attributes: { class: 'editor-content focus:outline-none' },
    },
  });



  return (
    <div>
      <div className="editor-container">
        <EditorToolbar editor={editor ?? null} />
        <EditorContent editor={editor as Editor} />
      </div>


    </div>
  );
}
