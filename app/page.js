"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

import Logo from "@/public/VISI/5.png";
import TagWorldAnimation from "@/components/heroRound";

export default function Home() {
  return (
    <main className={styles.homePage}>
      <Image src={Logo} width={180} height={50} alt="test logo" />
      <Link href="/login" className={styles.connectButton}>
        <button>Connexion</button>
      </Link>
      <section className={styles.hero}>
        <div className={styles.titleContainer}>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Créer la vie que tu veux.
          </motion.h1>
          <div className={styles.subtitles}>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              Fixe tes objectifs.
            </motion.p>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              Suis ton progrès.
            </motion.p>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              Reste fidèle à ton WHY.
            </motion.p>
          </div>
        </div>
        <TagWorldAnimation />

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Link href="/register" className={styles.button}>
            Commencer maintenant
          </Link>
        </motion.div>
      </section>

      <section className={styles.features}>
        <motion.div
          className={styles.feature}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h3
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            🎯 Objectifs clairs
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Définis tes buts à court, moyen et long terme.
          </motion.p>
        </motion.div>
        <motion.div
          className={styles.feature}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h3
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            📅 Suivi intelligent
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Visualise tes progrès jour après jour.
          </motion.p>
        </motion.div>
        <motion.div
          className={styles.feature}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h3
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            💭 Ton WHY
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Reste aligné avec ce qui compte vraiment pour toi.
          </motion.p>
        </motion.div>
      </section>

      <footer className={styles.footer}>
        <p>✨ VisionBoard — transforme tes intentions en actions.</p>
      </footer>
    </main>
  );
}
