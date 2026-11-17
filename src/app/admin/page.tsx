// app/admin/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { formatPrice } from "@/lib/currency";
import "./admin.css";

interface Order {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  whatsapp: string;
  email: string;
  subtotal: number;
  shippingCost: number;
  grandTotal: number;
  status: "pending" | "paid" | "shipped" | "cancelled" | null;
  createdAt: string | null;
  items: {
    id: string;
    title: string;
    category: string;
    quantity: number;
    unitPrice: number;
  }[];
}

interface BankDetails {
  beneficiary: string;
  iban: string;
  bic: string;
  address: string;
}

const emptyBankDetails: BankDetails = {
  beneficiary: "",
  iban: "",
  bic: "",
  address: "",
};

function isAdminOrder(value: unknown): value is Order {
  if (typeof value !== "object" || value === null) return false;
  const order = value as Record<string, unknown>;
  return (
    typeof order.id === "string" &&
    typeof order.firstName === "string" &&
    typeof order.lastName === "string" &&
    typeof order.country === "string" &&
    typeof order.streetAddress === "string" &&
    typeof order.whatsapp === "string" &&
    typeof order.email === "string" &&
    typeof order.subtotal === "number" &&
    typeof order.shippingCost === "number" &&
    typeof order.grandTotal === "number" &&
    (order.status === null ||
      order.status === "pending" ||
      order.status === "paid" ||
      order.status === "shipped" ||
      order.status === "cancelled") &&
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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderStatusError, setOrderStatusError] = useState("");
  const [bankDetails, setBankDetails] = useState<BankDetails>(emptyBankDetails);
  const [loadingBankDetails, setLoadingBankDetails] = useState(true);
  const [savingBankDetails, setSavingBankDetails] = useState(false);
  const [bankDetailsStatus, setBankDetailsStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        loadOrders();
        loadBankDetails();
      } else {
        const data = await res.json();
        setLoginError(data.error || "La connexion a échoué");
      }
    } catch {
      setLoginError("Une erreur est survenue.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  const loadOrders = useCallback(async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch("/api/orders");
      const data: unknown = await res.json();
      if (!res.ok || !Array.isArray(data) || !data.every(isAdminOrder)) {
        throw new Error("Les commandes n'ont pas pu être chargées.");
      }
      setOrders(data);
    } catch (err) {
      console.error("Error loading orders:", err);
      setOrderStatusError(
        err instanceof Error
          ? err.message
          : "Les commandes n'ont pas pu être chargées.",
      );
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  const handleOrderStatusChange = async (
    orderId: string,
    status: NonNullable<Order["status"]>,
  ) => {
    setOrderStatusError("");
    try {
      const response = await fetch(
        `/api/admin/orders/${encodeURIComponent(orderId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "Le statut de la commande n'a pas pu être enregistré.",
        );
      }
      setOrders((previous) =>
        previous.map((order) =>
          order.id === orderId ? { ...order, status } : order,
        ),
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      setOrderStatusError(
        error instanceof Error
          ? error.message
          : "Le statut de la commande n'a pas pu être enregistré.",
      );
    }
  };

  const loadBankDetails = useCallback(async () => {
    setLoadingBankDetails(true);
    setBankDetailsStatus(null);
    try {
      const res = await fetch("/api/bank-details");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || "Les coordonnées bancaires n'ont pas pu être chargées.",
        );
      }

      setBankDetails(
        data.bankDetails
          ? { ...data.bankDetails, address: data.bankDetails.address ?? "" }
          : emptyBankDetails,
      );
    } catch (error) {
      console.error("Error loading bank details:", error);
      setBankDetailsStatus({
        type: "error",
        message: "Les coordonnées bancaires n'ont pas pu être chargées.",
      });
    } finally {
      setLoadingBankDetails(false);
    }
  }, []);

  useEffect(() => {
    let isCurrent = true;

    fetch("/api/admin/check")
      .then((res) => {
        if (!isCurrent) {
          return;
        }
        if (res.ok) {
          setIsAuthenticated(true);
          loadOrders();
          loadBankDetails();
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setIsAuthenticated(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [loadBankDetails, loadOrders]);

  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails((previous) => ({ ...previous, [name]: value }));
  };

  const handleBankDetailsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingBankDetails(true);
    setBankDetailsStatus(null);

    try {
      const res = await fetch("/api/bank-details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bankDetails),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || "Les coordonnées bancaires n'ont pas pu être enregistrées.",
        );
      }

      setBankDetailsStatus({
        type: "success",
        message: "Coordonnées bancaires mises à jour avec succès.",
      });
    } catch (error) {
      console.error("Error saving bank details:", error);
      setBankDetailsStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Les coordonnées bancaires n'ont pas pu être enregistrées.",
      });
    } finally {
      setSavingBankDetails(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="admin-loading">
        <p>Chargement…</p>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <main className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <i className="fa-solid fa-lock admin-login-icon"></i>
            <h1 className="admin-login-title">Connexion Admin</h1>
            <p className="admin-login-subtitle">Administration KFK</p>
          </div>

          {loginError && <div className="admin-login-error">{loginError}</div>}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-form-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Administrateur"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="admin-btn-primary">
              Se Connecter
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ADMIN DASHBOARD
  return (
    <main className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="admin-header-title">Commandes</h1>
          <p className="admin-header-desc">
            Aperçu de toutes les commandes clients reçues
          </p>
        </div>

        <button onClick={handleLogout} className="admin-btn-logout">
          <i className="fa-solid fa-right-from-bracket"></i> Se Déconnecter
        </button>
      </div>

      <section
        className="admin-bank-card"
        aria-labelledby="bank-details-heading"
      >
        <h2 id="bank-details-heading" className="admin-bank-title">
          <i className="fa-solid fa-building-columns"></i> Configurer les Coordonnées Bancaires
        </h2>
        <form className="admin-bank-form" onSubmit={handleBankDetailsSave}>
          <div className="admin-bank-field">
            <label htmlFor="bank-beneficiary">Titulaire du compte *</label>
            <input
              id="bank-beneficiary"
              name="beneficiary"
              value={bankDetails.beneficiary}
              onChange={handleBankDetailsChange}
              disabled={loadingBankDetails || savingBankDetails}
              maxLength={120}
              autoComplete="name"
              required
            />
          </div>
          <div className="admin-bank-field">
            <label htmlFor="bank-iban">IBAN *</label>
            <input
              id="bank-iban"
              name="iban"
              value={bankDetails.iban}
              onChange={handleBankDetailsChange}
              disabled={loadingBankDetails || savingBankDetails}
              maxLength={50}
              autoComplete="off"
              required
            />
          </div>
          <div className="admin-bank-field">
            <label htmlFor="bank-bic">SWIFT / BIC *</label>
            <input
              id="bank-bic"
              name="bic"
              value={bankDetails.bic}
              onChange={handleBankDetailsChange}
              disabled={loadingBankDetails || savingBankDetails}
              maxLength={20}
              autoComplete="off"
              required
            />
          </div>
          <div className="admin-bank-field">
            <label htmlFor="bank-address">Adresse de la banque (optionnel)</label>
            <input
              id="bank-address"
              name="address"
              value={bankDetails.address}
              onChange={handleBankDetailsChange}
              disabled={loadingBankDetails || savingBankDetails}
              maxLength={200}
              autoComplete="street-address"
            />
          </div>
          <button
            type="submit"
            className="admin-bank-save"
            disabled={loadingBankDetails || savingBankDetails}
          >
            {loadingBankDetails
              ? "Chargement des coordonnées bancaires…"
              : savingBankDetails
                ? "Enregistrement…"
                : "Mettre à jour les coordonnées bancaires"}
          </button>
        </form>
        {bankDetailsStatus && (
          <p
            className={`admin-bank-status admin-bank-status-${bankDetailsStatus.type}`}
            role="status"
          >
            {bankDetailsStatus.message}
          </p>
        )}
      </section>

      {orderStatusError && (
        <p className="admin-bank-status admin-bank-status-error" role="alert">
          {orderStatusError}
        </p>
      )}
      {loadingOrders ? (
        <p className="admin-loading">Chargement des commandes…</p>
      ) : orders.length === 0 ? (
        <div className="admin-empty-state">Aucune commande trouvée.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID Commande</th>
                <th>Client</th>
                <th>Adresse de Livraison</th>
                <th>Contact</th>
                <th>Total</th>
                <th>Date</th>
                <th>Produits</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="admin-order-id">{order.id}</td>
                  <td>
                    <strong>
                      {order.firstName} {order.lastName}
                    </strong>
                    <br />
                    <span className="admin-customer-sub">{order.country}</span>
                  </td>
                  <td>{order.streetAddress}</td>
                  <td>
                    <a
                      href={`https://wa.me/${order.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-whatsapp-link"
                    >
                      <i className="fa-brands fa-whatsapp"></i> {order.whatsapp}
                    </a>
                    <br />
                    <span className="admin-customer-sub">{order.email}</span>
                  </td>
                  <td className="admin-price">{formatPrice(order.grandTotal)}</td>
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"}
                  </td>
                  <td>
                    <ul className="admin-order-items">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.quantity} × {item.title}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <select
                      aria-label={`Statut ${order.id}`}
                      className="admin-order-status-select"
                      value={order.status ?? "pending"}
                      onChange={(event) =>
                        handleOrderStatusChange(
                          order.id,
                          event.target.value as NonNullable<Order["status"]>,
                        )
                      }
                    >
                      <option value="pending">En attente</option>
                      <option value="paid">Payé</option>
                      <option value="shipped">Expédié</option>
                      <option value="cancelled">Annulé</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}