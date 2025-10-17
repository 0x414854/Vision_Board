"use client";
import styles from "@/styles/tagWorldAnimation.module.css";
import { motion } from "framer-motion";

export default function TagWorldAnimation() {
  const words = [
    "Détermination",
    "Croissance",
    "Objectifs",
    "Succès",
    "Motivation",
    "Discipline",
    "Confiance",
    "Vision",
    "Progrès",
    "Courage",
    "Rêve",
    "Ambition",
    "Résilience",
    "Énergie",
    "Passion",
    "Focus",
    "Gratitude",
    "Inspiration",
    "Créativité",
    "Clarté",
    "Force",
    "Patience",
    "Action",
    "Joie",
    "Alignement",
    "Sérénité",
    "Évolution",
    "Victoire",
    "Constance",
    "Liberté",
  ];

  return (
    <motion.div
      className={styles.tagcloudWrapper}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <ul
        className={styles.tagcloud}
        style={{ "--num-elements": words.length }}
      >
        {words.map((word, index) => (
          <li
            key={index}
            className={styles.tagcloudTag}
            style={{ "--index": index + 1 }}
          >
            <span>{word}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
