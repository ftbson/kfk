"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notifyAuthChanged, useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/currency";
import { siteConfig } from "@/config/site";

interface AccountOrderItem {
  id: string;
  title: string;
  category: string;
  quantity: number;
  unitPrice: number;
}

interface AccountOrder {
  id: string;
  subtotal: number;
  shippingCost: number;
  grandTotal: number;
  status: string | null;
  createdAt: string | null;
  items: AccountOrderItem[];
}

const orderStatusLabels: Record<string, string> = {
  pending: "En attente",
  paid: "Payé",
  shipped: "Expédié",
  cancelled: "Annulé",
};

function isAccountOrder(value: unknown): value is AccountOrder {
  if (typeof value !== "object" || value === null) return false;
  const order = value as Record<string, unknown>;
  return (
    typeof order.id === "string" &&
    typeof order.subtotal === "number" &&
    typeof order.shippingCost === "number" &&
    typeof order.grandTotal === "number" &&
    (typeof order.status === "string" || order.status === null) &&
    (typeof order.createdAt === "string" || order.createdAt === null) &&
    Array.isArray(order.items) &&
    order.items.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        typeof item.id === "string" &&
        "title" in item &&
        typeof item.title === "string" &&
        "category" in item &&
        typeof item.category === "string" &&
        "quantity" in item &&
        typeof item.quantity === "number" &&
        "unitPrice" in item &&
        typeof item.unitPrice === "number",
    )
  );
}

export default function CustomerAccountPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [orders, setOrders] = useState<AccountOrder[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [error, setError] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  const loadOrders = useCallback(async () => {
    try {
      const response = await fetch("/api/account/orders", { cache: "no-store" });
      const data: unknown = await response.json();
      if (!response.ok) {
        throw new Error("L'historique des commandes n'a pas pu être chargé.");
      }
      if (
        typeof data !== "object" ||
        data === null ||
        !("orders" in data) ||
        !Array.isArray(data.orders) ||
        !data.orders.every(isAccountOrder)
      ) {
        throw new Error("La réponse de l'historique des commandes est invalide.");
      }
      setOrders(data.orders);
    } catch (loadError) {
      console.error("Error loading customer orders:", loadError);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "L'historique des commandes n'a pas pu être chargé.",
      );
    } finally {
      setIsLoadingOrders(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthLoading && !user) router.replace("/login");
  }, [isAuthLoading, router, user]);

  useEffect(() => {
    if (!user) return;
    const frameId = requestAnimationFrame(() => {
      void loadOrders();
    });
    return () => cancelAnimationFrame(frameId);
  }, [loadOrders, user]);

  const handleLogout = async () => {
    setIsSigningOut(true);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error("La déconnexion a échoué.");
      notifyAuthChanged();
      router.replace("/");
      router.refresh();
    } catch (logoutError) {
      console.error("Error signing out:", logoutError);
      setError("La déconnexion a échoué. Veuillez réessayer.");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isAuthLoading || !user) {
    return (
      <main className="account-page">
        <p className="account-loading">Chargement du compte…</p>
      </main>
    );
  }

  return (
    <main className="account-page">
      <header className="account-page-header">
        <div>
          <p className="storefront-eyebrow">MON COMPTE</p>
          <h1>Bonjour, {user.name}</h1>
          <p>{user.email}</p>
        </div>
        <button
          className="account-logout-button"
          disabled={isSigningOut}
          onClick={handleLogout}
        >
          <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true" />
          {isSigningOut ? "Déconnexion…" : "Se Déconnecter"}
        </button>
      </header>

      <section className="account-orders-section">
        <div className="account-orders-heading">
          <div>
            <p className="storefront-eyebrow">VOTRE ACTIVITÉ</p>
            <h2>Mes Commandes</h2>
          </div>
          <Link href="/packs" className="storefront-secondary-link">
            Continuer les achats
          </Link>
        </div>

        {error && <p className="account-form-message error" role="alert">{error}</p>}
        {isLoadingOrders ? (
          <p className="account-loading">Chargement des commandes…</p>
        ) : orders.length === 0 ? (
          <div className="storefront-empty-state">
            <i className="fa-solid fa-box-open" aria-hidden="true" />
            <h2>Aucune Commande</h2>
            <p>Les commandes passées avec ce compte apparaîtront ici.</p>
            <Link href="/packs" className="storefront-primary-link">
              Découvrir les Collections
            </Link>
          </div>
        ) : (
          <div className="account-order-list">
            {orders.map((order) => (
              <article className="account-order-card" key={order.id}>
                <header className="account-order-header">
                  <div>
                    <span className="account-order-label">Commande</span>
                    <h3>{order.id}</h3>
                    <time>
                      {order.createdAt
                        ? new Intl.DateTimeFormat(siteConfig.currency.locale, { dateStyle: "long" }).format(
                            new Date(order.createdAt),
                          )
                        : "Date non disponible"}
                    </time>
                  </div>
                  <span className={`account-order-status status-${order.status ?? "pending"}`}>
                    {orderStatusLabels[order.status ?? "pending"] ?? order.status}
                  </span>
                </header>
                <ul className="account-order-items">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      <span>
                        {item.quantity} × {item.title}
                      </span>
                      <strong>{formatPrice(item.quantity * item.unitPrice)}</strong>
                    </li>
                  ))}
                </ul>
                <footer className="account-order-total">
                  <span>Montant Total</span>
                  <strong>{formatPrice(order.grandTotal)}</strong>
                </footer>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}