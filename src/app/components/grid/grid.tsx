
"use client";

import React, { useState, useEffect } from "react";
import { Pane, ResizablePanes } from "resizable-panes-react";
import { useTheme } from "next-themes";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { indentWithTab } from "@codemirror/commands";
import { undo, redo } from "@codemirror/commands";
import CodeMirror from "@uiw/react-codemirror";
import styles from "./grid.module.css";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import Top from "../top/top";

interface GridProps {
  htmlEditorRef: React.RefObject<EditorView | null>;
  cssEditorRef: React.RefObject<EditorView | null>;
  jsEditorRef: React.RefObject<EditorView | null>;
}

const Grid: React.FC<GridProps> = ({ htmlEditorRef, cssEditorRef, jsEditorRef }) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [cssContent, setCssContent] = useState("");
  const [jsContent, setJsContent] = useState("");

  const { theme } = useTheme();

  const baseExtensions = [keymap.of([indentWithTab]), EditorState.tabSize.of(2)];

  useEffect(() => {
    // Load saved pen data from localStorage when component mounts
    const savedPen = localStorage.getItem("savedPen");
    if (savedPen) {
      const { html, css, js } = JSON.parse(savedPen);
      setHtmlContent(html);
      setCssContent(css);
      setJsContent(js);
    }
  }, []);

  const handleSave = () => {
    const penData = {
      html: htmlContent,
      css: cssContent,
      js: jsContent,
    };
    localStorage.setItem("savedPen", JSON.stringify(penData));
    alert("Pen saved!");
  };

  const handleEditorUpdate = (update: any, editorRef: React.RefObject<EditorView | null>) => {
    if (update.view) {
      editorRef.current = update.view;
    }
  };

  const handleUndo = (editorRef: React.RefObject<EditorView | null>) => {
    if (editorRef.current) {
      undo(editorRef.current);
    }
  };

  const handleRedo = (editorRef: React.RefObject<EditorView | null>) => {
    if (editorRef.current) {
      redo(editorRef.current);
    }
  };

  return (
    <div className={styles.container}>
      <Top 
        onUndo={() => handleUndo(htmlEditorRef)} 
        onRedo={() => handleRedo(htmlEditorRef)} 
        onSave={handleSave} 
      />

      <ResizablePanes uniqueId="uniqueId" className={styles.grid} vertical>
        <Pane id="P0" className={styles.left} size={1} resizerClass="bg-slate-500">
          <iframe
            srcDoc={`
              <html>
                <head>
                  <style>${cssContent}</style>
                </head>
                <body>
                  ${htmlContent}
                  <script>${jsContent}</script>
                </body>
              </html>
            `}
          />
        </Pane>

        <Pane id="P1" className={styles.right} size={1} resizerClass="bg-slate-500">
          <ResizablePanes uniqueId="uniqueId-horizontal" className={styles.rightColumnGrid}>
            <Pane id="P1-0" className={styles.row} size={1}>
              <CodeMirror
                value={htmlContent}
                extensions={[html(), ...baseExtensions]}
                onChange={(value) => setHtmlContent(value)}
                theme={theme === "dark" ? "dark" : "light"}
                onUpdate={(update) => handleEditorUpdate(update, htmlEditorRef)}
              />
            </Pane>

            <Pane id="P1-1" className={styles.row} size={1}>
              <CodeMirror
                value={cssContent}
                extensions={[css(), ...baseExtensions]}
                onChange={(value) => setCssContent(value)}
                theme={theme === "dark" ? "dark" : "light"}
                onUpdate={(update) => handleEditorUpdate(update, cssEditorRef)}
              />
            </Pane>

            <Pane id="P1-2" className={styles.row} size={1}>
              <CodeMirror
                value={jsContent}
                extensions={[javascript(), ...baseExtensions]}
                onChange={(value) => setJsContent(value)}
                theme={theme === "dark" ? "dark" : "light"}
                onUpdate={(update) => handleEditorUpdate(update, jsEditorRef)}
              />
            </Pane>
          </ResizablePanes>
        </Pane>
      </ResizablePanes>
    </div>
  );
};

export default Grid;
