"use client";

import { useEffect, useRef } from "react";
import styles from "@/styles/modalGoals.module.css";

export default function ModalGoals({ onClose, goalText }) {
  const canvasRef = useRef(null);

  // 🧨 Animation des feux d’artifice
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let fireworks = [];
    let animationFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    class Firework {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        const colors = ["#ffcc00", "#00e1ff", "#ff4fd8", "#9cff00", "#ff6a00"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 50; i++) {
          this.particles.push({
            x,
            y,
            angle: random(0, Math.PI * 2),
            speed: random(2, 6),
            radius: random(2, 4),
            color,
            opacity: 1,
            decay: random(0.015, 0.025),
          });
        }
      }

      update() {
        this.particles.forEach((p) => {
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed + 0.5; // gravité légère
          p.opacity -= p.decay;
        });
        this.particles = this.particles.filter((p) => p.opacity > 0);
      }

      draw() {
        this.particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.opacity})`;
          ctx.fill();
        });
      }
    }

    function hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    }

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.05)
        fireworks.push(
          new Firework(random(0, canvas.width), random(0, canvas.height / 2))
        );
      fireworks.forEach((fw) => {
        fw.update();
        fw.draw();
      });
      fireworks = fireworks.filter((fw) => fw.particles.length > 0);
      animationFrame = requestAnimationFrame(animate);
    }

    animate();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✖
        </button>
        <h2 className={styles.title}>🎉 Félicitations ! 🎯</h2>
        <p className={styles.message}>
          Tu as accompli ton objectif :
          <br />
          <strong>“{goalText || "Un pas de plus vers tes rêves"}”</strong>
        </p>
        <p className={styles.sub}>
          Continue sur cette lancée, tu es sur le bon chemin 🌟
        </p>
      </div>
    </div>
  );
}
