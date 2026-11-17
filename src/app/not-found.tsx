import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Introuvable</h2>
          <p className="not-found-message">
            La page que vous cherchez n'existe pas ou a été déplacée.
            Pas de souci — vous pouvez retrouver votre chemin.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="btn-primary">
              <i className="fa-solid fa-home" aria-hidden="true"></i>
              Retour à l'accueil
            </Link>
            <Link href="/packs" className="btn-secondary">
              <i className="fa-solid fa-bag-shopping" aria-hidden="true"></i>
              Explorer les Collections
            </Link>
          </div>
        </div>
        <footer className="not-found-footer">
          <p>&copy; {new Date().getFullYear()} {siteConfig.brand.name}. Tous droits réservés.</p>
        </footer>
      </div>
    </main>
  );
}