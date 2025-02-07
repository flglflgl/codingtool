"use client";

import { useTheme } from 'next-themes';
import styles from './top.module.css';

type TopProps = {
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
};

export default function Top({ onUndo, onRedo, onSave }: TopProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.top}>
      <div className={styles.left}>
        <button className={styles.btn} onClick={onUndo}>
          <img src="/undo.svg" alt="Undo" />
        </button>
        <button className={styles.btn} onClick={onRedo}>
          <img src="/redo.svg" alt="Redo" />
        </button>
      </div>

      <div className={styles.right}>
        <button className={styles.floppy} onClick={onSave}>
          <img src="/floppy.svg" alt="Save" />
        </button>
        <button
          className={styles.bulb}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <img src="/bulb.svg" alt="Toggle Theme" />
        </button>
      </div>
    </div>
  );
}
