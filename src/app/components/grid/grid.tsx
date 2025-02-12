
"use client";

import React, { useState, useEffect } from "react";
import { useCodeEditor } from "../../context/EditorContext";
import { Pane, ResizablePanes } from "resizable-panes-react";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { indentWithTab } from "@codemirror/commands";
import CodeMirror from "@uiw/react-codemirror";
import { ViewUpdate } from "@codemirror/view";
import styles from "./grid.module.css";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import Top from "../top/top";

const Grid: React.FC = () => {
  const {
    theme,
    onUndo,
    onRedo,
    onSave,
    setHtmlEditorRef,
    setCssEditorRef,
    setJsEditorRef,
  } = useCodeEditor();

  const [htmlContent, setHtmlContent] = useState("");
  const [cssContent, setCssContent] = useState("");
  const [jsContent, setJsContent] = useState("");

  const baseExtensions = [keymap.of([indentWithTab]), EditorState.tabSize.of(2)];

  useEffect(() => {
    const savedPen = localStorage.getItem("savedPen");
    if (savedPen) {
      const { html, css, js } = JSON.parse(savedPen);
      setHtmlContent(html);
      setCssContent(css);
      setJsContent(js);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Top onUndo={onUndo} onRedo={onRedo} onSave={onSave} />

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
              <div className={styles.rowTop}>HTML</div>
              <CodeMirror
                value={htmlContent}
                extensions={[html(), ...baseExtensions]}
                onChange={setHtmlContent}
                theme={theme === "dark" ? "dark" : "light"}
                onUpdate={(update: ViewUpdate) => {
                  if (update.view) setHtmlEditorRef(update.view);
                }}
              />
            </Pane>
            <Pane id="P1-1" className={styles.row} size={1}>
              <div className={styles.rowTop}>CSS</div>
              <CodeMirror
                value={cssContent}
                extensions={[css(), ...baseExtensions]}
                onChange={setCssContent}
                theme={theme === "dark" ? "dark" : "light"}
                onUpdate={(update: ViewUpdate) => {
                  if (update.view) setCssEditorRef(update.view);
                }}
              />
            </Pane>
            <Pane id="P1-2" className={styles.row} size={1}>
              <div className={styles.rowTop}>JS</div>
              <CodeMirror
                value={jsContent}
                extensions={[javascript(), ...baseExtensions]}
                onChange={setJsContent}
                theme={theme === "dark" ? "dark" : "light"}
                onUpdate={(update: ViewUpdate) => {
                  if (update.view) setJsEditorRef(update.view);
                }}
              />
            </Pane>
          </ResizablePanes>
        </Pane>
      </ResizablePanes>
    </div>
  );
};

export default Grid;
