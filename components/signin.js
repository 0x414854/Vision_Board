"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function SignIn() {
  const [status, setStatus] = useState(null);

  const resendAction = async (formData) => {
    const email = formData.get("email");

    setStatus("sending");
    await signIn("resend", { email, redirect: false });
    setStatus("sent");
  };

  return (
    <form action={resendAction}>
      <label htmlFor="email-resend">
        Email
        <input type="email" id="email-resend" name="email" required />
      </label>

      <input type="submit" value="Recevoir le lien magique" />

      {status === "sending" && <p>Envoi du lien en cours...</p>}
      {status === "sent" && (
        <p>✅ Un lien magique vient d’être envoyé à ton adresse email.</p>
      )}
    </form>
  );
}
