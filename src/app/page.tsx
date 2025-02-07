
"use client"

import { useRef } from 'react';
import Grid from './components/grid/grid';
import Top from './components/top/top';
import { EditorView } from '@codemirror/view';
import { undo, redo } from '@codemirror/commands';
import Bottom from './components/bottom/bottom';

export default function EditorContainer() {
  const htmlEditorRef = useRef<EditorView | null>(null);
  const cssEditorRef = useRef<EditorView | null>(null);
  const jsEditorRef = useRef<EditorView | null>(null);
  const leftColumnRef = useRef<HTMLDivElement | null>(null);
  const rightColumnRef = useRef<HTMLDivElement | null>(null);

  const handleUndo = () => {
    // Perform undo for the currently focused editor
    if (htmlEditorRef.current) undo(htmlEditorRef.current);
    if (cssEditorRef.current) undo(cssEditorRef.current);
    if (jsEditorRef.current) undo(jsEditorRef.current);
  };

  const handleRedo = () => {
    // Perform redo for the currently focused editor
    if (htmlEditorRef.current) redo(htmlEditorRef.current);
    if (cssEditorRef.current) redo(cssEditorRef.current);
    if (jsEditorRef.current) redo(jsEditorRef.current);
  };

  let isResizing = false;

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const newWidth = e.clientX; // Capture cursor X position
    const minWidth = 150; // Prevent collapsing
    const maxWidth = window.innerWidth - 150; // Prevent overlap

    if (newWidth > minWidth && newWidth < maxWidth) {
      if (leftColumnRef.current && rightColumnRef.current) {
        leftColumnRef.current.style.width = `${newWidth}px`;
        rightColumnRef.current.style.width = `calc(100% - ${newWidth}px)`;
      }
    }
  };

  return (
    <div>
      <Top onUndo={handleUndo} onRedo={handleRedo} />
      <Grid
        htmlEditorRef={htmlEditorRef}
        cssEditorRef={cssEditorRef}
        jsEditorRef={jsEditorRef}
      />

      <Bottom />
    </div>
  );
}