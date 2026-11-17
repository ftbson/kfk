"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/config/site";

type AccountMode = "login" | "register";

export default function SignInPage() {
  const router = useRouter();
  const { user, isLoading, refresh } = useAuth();
  const [mode, setMode] = useState<AccountMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) router.replace("/account");
  }, [isLoading, router, user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        mode === "register" ? "/api/auth/register" : "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            mode === "register"
              ? { name, email, password }
              : { email, password },
          ),
        },
      );
      const data: unknown = await response.json();

      if (!response.ok) {
        const responseError =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : "La connexion a échoué. Veuillez réessayer.";
        setError(responseError);
        return;
      }

      await refresh();
      router.replace("/account");
      router.refresh();
    } catch (requestError) {
      console.error("Sign in error:", requestError);
      setError("Échec de la connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="account-auth-page">
      <section className="account-auth-card">
        <Link href="/" className="account-back-link">
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          Retour à la boutique
        </Link>
        <div className="account-auth-heading">
          <span className="account-auth-icon">
            <i className="fa-regular fa-user" aria-hidden="true" />
          </span>
          <p className="storefront-eyebrow">MON COMPTE KFK</p>
          <h1>{mode === "login" ? "Bon Retour" : "Créer un Compte"}</h1>
          <p>
            Consultez vos commandes et suivez leur statut.
          </p>
        </div>

        <div
          className="account-auth-tabs"
          role="tablist"
          aria-label="Compte Client"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "login"}
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setError("");
            }}
          >
            Connexion
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "register"}
            className={mode === "register" ? "active" : ""}
            onClick={() => {
              setMode("register");
              setError("");
            }}
          >
            Créer un Compte
          </button>
        </div>

        <form className="account-auth-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <label>
              Nom complet
              <input
                autoComplete="name"
                maxLength={100}
                minLength={2}
                onChange={(event) => setName(event.target.value)}
                required
                value={name}
              />
            </label>
          )}
          <label>
            Adresse email
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            Mot de passe
            <input
              autoComplete={
                mode === "register" ? "new-password" : "current-password"
              }
              maxLength={128}
              minLength={mode === "register" ? 8 : undefined}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
            {mode === "register" && <small>Au moins 8 caractères.</small>}
          </label>

          {error && (
            <p className="account-form-message error" role="alert">
              {error}
            </p>
          )}

          <button
            className="storefront-primary-link account-submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Patientez…"
              : mode === "login"
                ? "Se Connecter"
                : "Créer le Compte"}
            {!isSubmitting && (
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            )}
          </button>
        </form>

        <p className="account-footer-note">
          En continuant, vous acceptez nos <Link href="/terms">Conditions de Vente</Link> et <Link href="/legal/privacy">Politique de Confidentialité</Link>.
        </p>
      </section>
    </main>
  );
}