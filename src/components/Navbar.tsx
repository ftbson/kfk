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
      {/* 1. TOP ANNOUNCEMENT BAR (Noire, avec croix à gauche et texte centré) */}
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

      {/* 2. MAIN NAVBAR */}
      <MainNav 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favorites={favorites}
        totalItems={totalItems}
        user={user}
        navigation={navigation}
      />
    </header>
  );
}

function MainNav({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  isSearchOpen, 
  setIsSearchOpen, 
  searchQuery, 
  setSearchQuery, 
  favorites, 
  totalItems, 
  user, 
  navigation 
}: any) {
  return (
    <>
      <div className="kfk-main-nav">
        {/* Mobile Hamburger Trigger */}
        <button
          className="kfk-hamburger-btn"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

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

        {/* Center Part: Categories (Desktop) */}
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
          <button
            className="kfk-action-btn search-trigger-btn"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Rechercher"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          <Link href={user ? "/account" : "/login"} className="kfk-action-btn" aria-label="Mon compte">
            <i className="fa-regular fa-user"></i>
          </Link>

          <Link href="/favorites" className="kfk-action-btn" aria-label="Favoris">
            <i className="fa-regular fa-heart"></i>
            {favorites?.length > 0 && <span className="badge" aria-label={`${favorites.length} favoris`}>{favorites.length}</span>}
          </Link>

          <Link href="/cart" className="kfk-action-btn cart-btn" aria-label="Panier d'achat">
            <i className="fa-solid fa-bag-shopping"></i>
            {totalItems > 0 && <span className="badge gold-badge" aria-label={`${totalItems} articles dans le panier`}>{totalItems}</span>}
          </Link>
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
                placeholder="Rechercher djalabiya, parfum, accessoire..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                aria-label="Rechercher des produits"
              />
              {searchQuery && (
                <button className="clear-btn" onClick={() => setSearchQuery("")} aria-label="Effacer la recherche">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
            <button className="close-search-btn" onClick={() => setIsSearchOpen(false)} aria-label="Fermer la recherche">
              Fermer
            </button>
          </div>
          <div className="search-overlay-results">
            <p className="search-hint">Commencez à taper pour voir les suggestions KFK...</p>
          </div>
        </div>
      )}

      {/* MOBILE DRAWER MENU */}
      <div className={`kfk-mobile-drawer ${isMobileMenuOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu mobile">
        <div className="drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="drawer-content">
          <div className="drawer-header">
            <Image src="/img/logo.png" alt={siteConfig.brand.shortName} width={100} height={32} />
            <button className="drawer-close-btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Fermer le menu">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="drawer-body">
            <nav className="mobile-nav-links">
              {navigation.main.map((item: any) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={('highlight' in item && item.highlight) ? "gold-text" : ""}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="drawer-divider" />
              {navigation.secondary.map((item: any) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="drawer-footer">
            <p className="slogan">{siteConfig.brand.slogan}</p>
          </div>
        </div>
      </div>
    </>
  );
}