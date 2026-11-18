"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const { favorites, totalItems } = useCart();
  const { user } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);

  const { navigation, promoBar } = siteConfig;

  return (
    <header className="kfk-header">
      {/* TOP ANNOUNCEMENT BAR */}
      {isTopBarVisible && (
        <div className="kfk-top-bar" role="region" aria-label="Annonce promotionnelle">
          <button 
            className="top-bar-close-btn" 
            onClick={() => setIsTopBarVisible(false)}
            aria-label="Fermer l'annonce"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="top-bar-center-content">
            <span>{promoBar?.text || "Vous aimez nos pièces ?"}</span>{" "}
            <Link href={promoBar?.ctaLink || "/packs"} className="top-bar-inline-link">
              {promoBar?.ctaText || "Découvrez ici"}
            </Link>
          </div>
        </div>
      )}

      {/* MAIN NAVBAR */}
      <div className="kfk-main-nav">
        {/* Left Part: Logo KFK */}
        <div className="kfk-logo-container">
          <Link href="/" aria-label={`${siteConfig.brand.name} - Accueil`}>
            <Image
              src="/img/logo.png"
              alt={siteConfig.brand.name}
              width={130}
              height={45}
              priority
              className="kfk-logo"
            />
          </Link>
        </div>

        {/* Center Part: Categories (Desktop only) */}
        <nav className="kfk-desktop-categories" aria-label="Navigation principale">
          {navigation.main.map((item: any) => (
            <Link
              key={item.href}
              href={item.href}
              className={('highlight' in item && item.highlight) ? "highlight-gold" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Part: Actions */}
        <div className="kfk-user-actions">
          <Link href={user ? "/account" : "/login"} className="kfk-action-btn" aria-label="Mon compte">
            <i className="fa-regular fa-user"></i>
          </Link>

          <button
            className="kfk-action-btn search-trigger-btn"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Rechercher"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          <Link href="/cart" className="kfk-action-btn cart-btn" aria-label="Panier d'achat">
            <i className="fa-solid fa-bag-shopping"></i>
            {totalItems > 0 && <span className="badge gold-badge" aria-label={`${totalItems} articles`}>{totalItems}</span>}
          </Link>

          {/* Mobile Hamburger Trigger */}
          <button
            className="kfk-hamburger-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="kfk-search-overlay" role="dialog" aria-modal="true" aria-label="Recherche">
          <div className="search-overlay-header">
            <div className="search-input-pill">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
              <input
                type="text"
                placeholder="Rechercher JALABIYA, parfum, accessoire..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                aria-label="Rechercher des produits"
              />
              {searchQuery && (
                <button className="clear-btn" onClick={() => setSearchQuery("")} aria-label="Effacer">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
            <button className="close-search-btn" onClick={() => setIsSearchOpen(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* MOBILE DRAWER MENU (Plein écran & Animation en cascade) */}
      <div className={`kfk-mobile-drawer ${isMobileMenuOpen ? "open" : ""}`} role="dialog" aria-modal="true">
        <div className="drawer-content">
          <div className="drawer-header">
            <Image src="/img/logo.png" alt={siteConfig.brand.shortName} width={110} height={35} />
            <button className="drawer-close-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Fermer">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="drawer-body">
            <nav className="mobile-nav-links">
              {navigation.main.map((item: any, index: number) => (
                <React.Fragment key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mobile-nav-item"
                    style={{ "--item-index": index } as React.CSSProperties}
                  >
                    <span>{item.label}</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                  <hr className="drawer-divider" />
                </React.Fragment>
              ))}
              {navigation.secondary?.map((item: any, index: number) => (
                <React.Fragment key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mobile-nav-item"
                    style={{ "--item-index": navigation.main.length + index } as React.CSSProperties}
                  >
                    <span>{item.label}</span>
                  </Link>
                  <hr className="drawer-divider" />
                </React.Fragment>
              ))}
            </nav>
          </div>

          <div className="drawer-footer">
            <p className="slogan">{siteConfig.brand.slogan}</p>
          </div>
        </div>
      </div>
    </header>
  );
}