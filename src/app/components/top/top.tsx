
"use client";

import { useCodeEditor } from "../../context/EditorContext";
import styles from "./top.module.css";

export default function Top({ onUndo, onRedo, onSave }: { onUndo: () => void; onRedo: () => void; onSave: () => void }) {
  const { theme, toggleTheme } = useCodeEditor();

  return (
    <div className={styles.top}>
      <div className={styles.left}>
        <button title="Undo" className={styles.btn} onClick={onUndo}>
          <img src="/undo.svg" alt="Undo" />
        </button>
        <button title="Redo" className={styles.btn} onClick={onRedo}>
          <img src="/redo.svg" alt="Redo" />
        </button>
      </div>
      <div className={styles.right}>
        <button title="Save" className={styles.floppy} onClick={onSave}>
          <img src="/floppy.svg" alt="Save" />
        </button>
        <button title="Color Theme" className={styles.bulb} onClick={toggleTheme}>
          <img src={theme === "light" ? "/bulbOn.svg" : "/bulb.svg"} alt="Toggle Theme" />
        </button>
      </div>
    </div>
  );
}