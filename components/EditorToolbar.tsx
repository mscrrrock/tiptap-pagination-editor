'use client';

import React, { useCallback } from 'react';
import type { Editor } from '@tiptap/core';

/**
 * EditorToolbar (reusable)
 * - Receives an `editor` instance (or null) and exposes formatting controls
 * - Uses TipTap `editor.chain().focus().<action>().run()` for all commands
 * - Buttons reflect the `editor.isActive(...)` state for accessibility/visuals
 */

type Props = { editor: Editor | null };

function ToolbarButton({
  onClick,
  active,
  label,
  title,
  disabled,
}: {
  onClick: () => void;
  active?: boolean;
  label: React.ReactNode;
  title?: string;
  disabled?: boolean;
}) {
  const base = 'px-3 py-1 rounded border text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400';
  const activeClasses = 'bg-sky-600 text-white border-sky-600';
  const inactiveClasses = 'bg-white text-slate-700 hover:bg-gray-50';
  const disabledClasses = 'opacity-50 cursor-not-allowed';

  const classes = [
    base,
    active ? activeClasses : inactiveClasses,
    disabled ? disabledClasses : '',
  ].join(' ');

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      data-active={active ? 'true' : 'false'}
      aria-pressed={active ? 'true' : 'false'}
      className={classes}
    >
      {label}
    </button>
  );
}

export default function EditorToolbar({ editor }: Props) {
  const toggleBold = useCallback(() => editor?.chain().focus().toggleBold().run(), [editor]);
  const toggleItalic = useCallback(() => editor?.chain().focus().toggleItalic().run(), [editor]);
  const toggleBullet = useCallback(() => editor?.chain().focus().toggleBulletList().run(), [editor]);
  const setH1 = useCallback(() => editor?.chain().focus().toggleHeading({ level: 1 }).run(), [editor]);
  const setH2 = useCallback(() => editor?.chain().focus().toggleHeading({ level: 2 }).run(), [editor]);
  const setParagraph = useCallback(() => editor?.chain().focus().setParagraph().run(), [editor]);

  const isActive = (name: string, attrs?: Record<string, any>) => {
    if (!editor) return false;
    return editor.isActive(name, attrs);
  };

  return (
    // Fixed toolbar: placed in a fixed wrapper by parent; keep markup simple so
    // it can be hidden in print via `.hidden-print`.
    <div className="flex gap-2 border-b bg-white px-4 py-2 z-10 shadow-sm" role="toolbar" aria-label="Editor formatting">
      <ToolbarButton onClick={toggleBold} active={isActive('bold')} label={<strong>B</strong>} title="Bold (Ctrl/Cmd+B)" disabled={!editor} />
      <ToolbarButton onClick={toggleItalic} active={isActive('italic')} label={<em>I</em>} title="Italic (Ctrl/Cmd+I)" disabled={!editor} />
      <ToolbarButton onClick={toggleBullet} active={isActive('bulletList')} label={<span>• List</span>} title="Bullet list" disabled={!editor} />
      <ToolbarButton onClick={setH1} active={isActive('heading', { level: 1 })} label={<span>H1</span>} title="Heading 1" disabled={!editor} />
      <ToolbarButton onClick={setH2} active={isActive('heading', { level: 2 })} label={<span>H2</span>} title="Heading 2" disabled={!editor} />
      <ToolbarButton onClick={setParagraph} active={isActive('paragraph')} label={<span>P</span>} title="Paragraph" disabled={!editor} />

      <button
        onClick={() => window.print()}
        className="border px-3 py-1 rounded text-sm hover:bg-gray-100"
        type="button"
      >
        Print
      </button>
    </div>
  );
}
