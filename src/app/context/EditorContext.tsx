
"use client";

import React, { createContext, useContext, useRef } from "react";
import { useTheme } from "next-themes";
import { EditorView } from "@codemirror/view";
import { undo, redo } from "@codemirror/commands";

interface CodeEditorContextType {
  theme: string;
  toggleTheme: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  setHtmlEditorRef: (editor: EditorView | null) => void;
  setCssEditorRef: (editor: EditorView | null) => void;
  setJsEditorRef: (editor: EditorView | null) => void;
}

const CodeEditorContext = createContext<CodeEditorContextType | undefined>(undefined);

export const CodeEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, setTheme } = useTheme();

  const htmlEditorRef = useRef<EditorView | null>(null);
  const cssEditorRef = useRef<EditorView | null>(null);
  const jsEditorRef = useRef<EditorView | null>(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const onUndo = () => {
    htmlEditorRef.current && undo(htmlEditorRef.current);
    cssEditorRef.current && undo(cssEditorRef.current);
    jsEditorRef.current && undo(jsEditorRef.current);
  };

  const onRedo = () => {
    htmlEditorRef.current && redo(htmlEditorRef.current);
    cssEditorRef.current && redo(cssEditorRef.current);
    jsEditorRef.current && redo(jsEditorRef.current);
  };

  const onSave = () => {
    if (!htmlEditorRef.current || !cssEditorRef.current || !jsEditorRef.current) return;

    const htmlContent = htmlEditorRef.current.state.doc.toString();
    const cssContent = cssEditorRef.current.state.doc.toString();
    const jsContent = jsEditorRef.current.state.doc.toString();

    const penData = { html: htmlContent, css: cssContent, js: jsContent };
    
    localStorage.setItem("savedPen", JSON.stringify(penData));

    console.log("Pen saved!", penData);
  };

  return (
    <CodeEditorContext.Provider
      value={{
        theme: theme || "light",
        toggleTheme,
        onUndo,
        onRedo,
        onSave,
        setHtmlEditorRef: (editor) => (htmlEditorRef.current = editor),
        setCssEditorRef: (editor) => (cssEditorRef.current = editor),
        setJsEditorRef: (editor) => (jsEditorRef.current = editor),
      }}
    >
      {children}
    </CodeEditorContext.Provider>
  );
};

export const useCodeEditor = () => {
  const context = useContext(CodeEditorContext);
  if (!context) {
    throw new Error("useCodeEditor must be used within a CodeEditorProvider");
  }
  return context;
};
