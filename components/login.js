"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleCredentialsLogin(e) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Email ou mot de passe incorrect");
    } else {
      router.push("/dashboard"); // redirection après login
    }
  }

  return (
    <main className={styles.loginSection}>
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Bienvenue sur VisionBoard</h1>
        <p className={styles.subtitle}>
          Connectez-vous pour suivre vos objectifs
        </p>
        <div className={styles.container}>
          <div className={styles.buttons}>
            <button
              className={styles.oauthButton}
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
              Se connecter avec GitHub
            </button>

            <button
              className={styles.oauthButton}
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              Se connecter avec Google
            </button>
          </div>

          <div className={styles.separator}>ou</div>

          {/* Formulaire credentials */}
          <div className={styles.formContainer}>
            <form
              className={styles.credentialForm}
              onSubmit={handleCredentialsLogin}
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> */}
              <button type="submit" className={styles.submitButton}>
                Se connecter
              </button>
              {error && <p className={styles.error}>{error}</p>}
            </form>

            <p className={styles.signup}>
              Pas encore de compte ?{" "}
              <Link href="/register" className={styles.signupLink}>
                S’inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
