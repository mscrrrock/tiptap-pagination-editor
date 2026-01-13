'use client';

import React, { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import type { Editor } from '@tiptap/core';
import LeftRail from './LeftRail';
import {
  PAGE_HEIGHT_PX,
  PAGE_WIDTH_PX,
  CONTENT_WIDTH_PX,
  PAGE_PADDING_PX,
} from '../lib/print';
import { getDefaultExtensions } from '../lib/editor-config';

export default function PaginatedEditor({
  initialContent,
}: {
  initialContent?: string;
}) {
  const editor = useEditor({
    extensions: getDefaultExtensions(),
    content: initialContent ?? '',
    immediatelyRender: false,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'editor-content focus:outline-none',
      },
    },
  });

  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!editor) return;
    requestAnimationFrame(() => {
      try {
        editor.commands.focus();
      } catch {
        /* ignore */
      }
    });
  }, [editor]);

return (
  <>
    {/* Left toolbar */}
    <LeftRail editor={editor} />

    {/* App background */}
    <div
  className="min-h-screen pl-[112px] pt-24 pb-24"
  style={{
    background: '#f5f1eb', // warm beige desk
  }}
>
      {/* Page wrapper */}
      <div className="flex justify-center">
        <div
          style={{
            width: PAGE_WIDTH_PX,
            margin: '0 auto',
            background: '#ffffff',
          }}
        >
          {/* Paper card */}
          <div
            style={{
              background: 'white',
              borderRadius: 12,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              border: '1px solid #e5e7eb',
              paddingTop: PAGE_PADDING_PX,
              paddingBottom: PAGE_PADDING_PX,
              paddingLeft: PAGE_PADDING_PX * 1.8,
              paddingRight: PAGE_PADDING_PX * 1.8,
            }}
          >
            {/* Editor shell ALWAYS renders */}
            <div
              style={{
                width: CONTENT_WIDTH_PX,
                margin: '0 auto',
              }}
            >
              {editor ? (
                <EditorContent editor={editor as Editor} />
              ) : (
                <div className="text-gray-400 italic">
                  Initializing editor…
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);


}

