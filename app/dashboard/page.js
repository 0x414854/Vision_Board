"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/dashboard.module.css";

import ModalQuote from "@/components/modal/modalQuote";
import ModalGoals from "@/components/modal/modalGoals";

export default function DashboardPage() {
  const { data: session } = useSession();

  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [goals, setGoals] = useState({ court: [], moyen: [], long: [] });
  const [newGoal, setNewGoal] = useState({ text: "", term: "court" });
  const [dailyCount, setDailyCount] = useState(0);
  // 🟩 WHY
  const [whys, setWhys] = useState([]);
  const [newWhy, setNewWhy] = useState("");
  // MODAL GOALS
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalJustCompleted, setGoalJustCompleted] = useState(null);

  useEffect(() => {
    // Vérifie la date d'aujourd'hui (au format AAAA-MM-JJ)
    const today = new Date().toISOString().split("T")[0];
    const lastShown = localStorage.getItem("quoteShownDate");

    // Si le modal n’a pas encore été affiché aujourd’hui
    if (lastShown !== today) {
      setShowQuoteModal(true);
    }
  }, []);

  // 🔹 Charger les WHY + Goals
  useEffect(() => {
    if (!session?.user) return;

    async function loadData() {
      try {
        const [goalsRes, whyRes] = await Promise.all([
          fetch("/api/goals"),
          fetch("/api/why"),
        ]);

        const goalsData = await goalsRes.json();
        const grouped = { court: [], moyen: [], long: [] };
        goalsData.forEach((g) => grouped[g.term].push(g));
        setGoals(grouped);
        const whyData = await whyRes.json();
        setWhys(Array.isArray(whyData) ? whyData : []);

        const todayCount = goalsData.filter((g) => {
          if (!g.completedAt) return false;
          const completed = new Date(g.completedAt);
          const today = new Date();
          return completed.toDateString() === today.toDateString();
        }).length;
        setDailyCount(todayCount);
      } catch (err) {
        console.error("Erreur lors du chargement:", err);
      }
    }

    loadData();
  }, [session]);

  // 🟦 Ajouter un WHY
  const addWhy = async () => {
    if (!newWhy.trim()) return;
    const res = await fetch("/api/why", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newWhy }),
    });

    if (!res.ok) return;
    const created = await res.json();
    setWhys((prev) => [created, ...prev]);
    setNewWhy("");
  };

  // 🟥 Supprimer un WHY
  const deleteWhy = async (id) => {
    await fetch("/api/why", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setWhys((prev) => prev.filter((w) => w.id !== id));
  };

  // 🔹 Ajouter un objectif
  const addGoal = async () => {
    if (!newGoal.text.trim()) return;
    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    });
    const created = await res.json();
    setGoals((prev) => ({
      ...prev,
      [created.term]: [...prev[created.term], created],
    }));
    setNewGoal({ text: "", term: "court" });
  };

  const deleteGoal = async (id, term) => {
    await fetch("/api/goals", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setGoals((prev) => ({
      ...prev,
      [term]: prev[term].filter((g) => g.id !== id),
    }));
  };

  const toggleGoalDone = async (goal) => {
    const updated = { ...goal, done: !goal.done };

    await fetch("/api/goals", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    setGoals((prev) => ({
      ...prev,
      [goal.term]: prev[goal.term].map((g) =>
        g.id === goal.id ? { ...g, done: updated.done } : g
      ),
    }));

    if (updated.done) {
      setDailyCount((prev) => prev + 1);

      // 🟡 Ouvre le modal de félicitations
      setGoalJustCompleted(goal);
      setShowGoalModal(true);
    } else {
      setDailyCount((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  // 🔹 UI
  if (!session?.user) {
    return (
      <section className={styles.loginPrompt}>
        <p>Vous devez être connecté pour accéder à votre tableau de bord.</p>
        <Link href="/login">
          <button>Connexion</button>
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.dashboard}>
      <>
        {showQuoteModal && (
          <ModalQuote
            onClose={() => {
              const today = new Date().toISOString().split("T")[0];
              localStorage.setItem("quoteShownDate", today); // on enregistre la date du jour
              setShowQuoteModal(false);
            }}
          />
        )}

        {/* Reste du dashboard */}
      </>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="Photo de profil"
              width={70}
              height={70}
              className={styles.avatar}
            />
          )}
          <h1>
            Bienvenue, <span>{session.user.name || "Visionnaire"}</span>
          </h1>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => setShowQuoteModal(true)}
            className={styles.quoteButton}
            data-text="Citation du jour"
          >
            Citation du jour
          </button>
          <button onClick={() => signOut()} className={styles.logoutBtn}>
            Déconnexion
          </button>
        </div>
      </header>

      <section className={styles.whySection}>
        <div className={styles.why}>
          <div className={styles.whyContainer}>
            <h2>💭 Tes WHY</h2>
            {/* <button>Ajouter +</button> */}
          </div>

          <div className={styles.newWhy}>
            <input
              type="text"
              placeholder="Ajouter un WHY..."
              value={newWhy}
              onChange={(e) => setNewWhy(e.target.value)}
            />
            <button onClick={addWhy}>+</button>
          </div>
        </div>

        <ul
          className={whys.length === 0 ? styles.emptyWhysList : styles.whysList}
        >
          {whys.map((w) => (
            <li key={w.id} className={styles.whyItem}>
              <span>{w.content}</span>
              <button onClick={() => deleteWhy(w.id)}>🗑</button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.stats}>
          <h3>🎯 Objectifs réalisés aujourd’hui</h3>
          <p>{dailyCount}</p>
        </div>
      </section>

      <section className={styles.goalsSection}>
        <h2>🗂 Tes objectifs</h2>
        <div className={styles.newGoal}>
          <input
            type="text"
            placeholder="Nouvel objectif..."
            value={newGoal.text}
            onChange={(e) =>
              setNewGoal((prev) => ({ ...prev, text: e.target.value }))
            }
          />
          <div>
            <select
              value={newGoal.term}
              onChange={(e) =>
                setNewGoal((prev) => ({ ...prev, term: e.target.value }))
              }
            >
              <option value="court">Court terme</option>
              <option value="moyen">Moyen terme</option>
              <option value="long">Long terme</option>
            </select>
            <button onClick={addGoal}>➕ Ajouter</button>
          </div>
        </div>

        <div className={styles.goalsContainer}>
          {["court", "moyen", "long"].map((term) => (
            <div key={term} className={styles.termRow}>
              <h3>
                {term === "court"
                  ? "⏱ Court terme"
                  : term === "moyen"
                  ? "📆 Moyen terme"
                  : "🏔 Long terme"}
              </h3>
              <ul>
                {goals[term].map((g) => (
                  <li key={g.id} className={styles.goalItem}>
                    <span
                      // onClick={() => toggleGoalDone(g)}
                      className={g.done ? styles.goalDone : ""}
                    >
                      {g.text}
                    </span>
                    <div className={styles.goalActions}>
                      <input
                        type="checkbox"
                        checked={g.done}
                        onChange={() => toggleGoalDone(g)}
                        className={styles.goalCheckbox}
                      />

                      <button onClick={() => deleteGoal(g.id, term)}>🗑</button>
                    </div>
                  </li>
                ))}
              </ul>
              {showGoalModal && (
                <ModalGoals
                  goalText={goalJustCompleted?.text}
                  onClose={() => setShowGoalModal(false)}
                />
              )}
            </div>
          ))}
        </div>
      </section>
      <section className={styles.achievedGoalsSection}>
        <h2>✅ Tes objectifs accomplis</h2>
      </section>
    </section>
  );
}
