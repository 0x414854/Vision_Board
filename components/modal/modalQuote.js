"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/modalQuote.module.css";
import quotesData from "@/data/quote.json";

export default function ModalQuote({ onClose }) {
  const [quote, setQuote] = useState(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const today = new Date();
    const daySeed =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();
    const index = daySeed % quotesData.length;
    setQuote(quotesData[index]);
  }, []);

  if (!quote) return null;

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 500); // correspond à la durée de l'animation
  };

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.out : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modal} ${closing ? styles.out : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={handleClose}>
          X
        </button>
        <p className={styles.content}>"{quote.content}"</p>
        <p className={styles.author}>{quote.author}</p>
      </div>
    </div>
  );
}
