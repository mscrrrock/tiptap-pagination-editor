/*
 * Editor configuration and helpers
 * - Separated from the UI so the component stays presentational
 * - NOTE: this file must not be imported into a server component that will
 *   run on the server, because TipTap depends on browser APIs.
 */

import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { Extension } from "@tiptap/core"

export function getDefaultExtensions(): Extension[] {
  return [
    StarterKit,
    // UX: show a friendly placeholder when the document is empty (not part of content)
    Placeholder.configure({
      placeholder: "Start typing…",
      showOnlyWhenEditable: true,
      showOnlyCurrent: false,
    }),
  ]
}