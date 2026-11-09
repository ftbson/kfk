"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { favorites, totalItems } = useCart();
  const { user } = useAuth();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Index du carrousel de la barre d'annonce défilante
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    "DÉCOUVREZ LA NOUVELLE COLLECTION KFK",
    "LIVRAISON NATIONALE & INTERNATIONALE DISPONIBLE",
    "REJOIGNEZ LE KFK VIP CLUB - AVANTAGES EXCLUSIFS",
  ];

  // Défilement automatique des annonces
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <header className="kfk-header">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="kfk-top-bar">
        <div className="top-bar-left">
          <span className="timer-badge">13 J : 22 H : 01 M : 48 S</span>
        </div>

        <div className="top-bar-center">
          <button 
            className="top-bar-nav-btn" 
            onClick={() => setAnnouncementIndex((prev) => (prev - 1 + announcements.length) % announcements.length)}
            aria-label="Annonce précédente"
          >
            &#8249;
          </button>
          <div className="announcement-slider">
            <span key={announcementIndex} className="announcement-text">
              {announcements[announcementIndex]}
            </span>
          </div>
          <button 
            className="top-bar-nav-btn" 
            onClick={() => setAnnouncementIndex((prev) => (prev + 1) % announcements.length)}
            aria-label="Annonce suivante"
          >
            &#8250;
          </button>
        </div>

        <div className="top-bar-right">
          <Link href="/collections/vip" className="top-bar-cta">
            BLACK FRIDAY
          </Link>
        </div>
      </div>

      {/* 2. MAIN NAVBAR (2 PARTIES : LOGO + LIENS CENTRES/DROITE) */}
      <div className="kfk-main-nav">
        {/* Mobile Hamburger Trigger */}
        <button 
          className="kfk-hamburger-btn"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Partie Gauche : Logo KFK */}
        <div className="kfk-logo-container">
          <Link href="/">
            <Image 
              src="/img/logo.png" 
              alt="KFK - KUN FAYA KUN" 
              width={130} 
              height={45} 
              priority
              className="kfk-logo"
            />
          </Link>
        </div>

        {/* Partie Centrale : Catégories (Affiché uniquement sur PC - Intégré directement dans la nav principale) */}
        <nav className="kfk-desktop-categories">
          <Link href="/djalabiya-house">DJALABIYA HOUSE</Link>
          <Link href="/accessories">ACCESSOIRES</Link>
          <Link href="/look-and-drip">LOOK & DRIP</Link>
          <Link href="/signature">SIGNATURE</Link>
          <Link href="/packs" className="highlight-gold">PACKS KFK</Link>
        </nav>

        {/* Partie Droite : Actions (Recherche, Compte, Favoris, Panier) */}
        <div className="kfk-user-actions">
          {/* Déclencheur de la recherche en overlay (PC et Mobile) */}
          <button 
            className="kfk-action-btn search-trigger-btn"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Rechercher"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          {/* <Link href={user ? "/account" : "/login"} className="kfk-action-btn" aria-label="Compte">
            <i className="fa-regular fa-user"></i>
          </Link> */}

          <Link href="/favorites" className="kfk-action-btn" aria-label="Favoris">
            <i className="fa-regular fa-heart"></i>
            {favorites?.length > 0 && <span className="badge">{favorites.length}</span>}
          </Link>

          <Link href="/cart" className="kfk-action-btn cart-btn" aria-label="Panier">
            <i className="fa-solid fa-bag-shopping"></i>
            {totalItems > 0 && <span className="badge gold-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>

      {/* OVERLAY DE RECHERCHE EN PREMIER PLAN (Actif sur PC & Mobile via l'icône) */}
      {isSearchOpen && (
        <div className="kfk-search-overlay">
          <div className="search-overlay-header">
            <div className="search-input-pill">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input 
                type="text" 
                placeholder="Rechercher un article, une djalabiya, un parfum..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button className="clear-btn" onClick={() => setSearchQuery("")}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
            <button className="close-search-btn" onClick={() => setIsSearchOpen(false)}>
              Fermer
            </button>
          </div>
          <div className="search-overlay-results">
            <p className="search-hint">Commencez à taper pour afficher les suggestions KFK...</p>
          </div>
        </div>
      )}

      {/* DRAWER MENU MOBILE */}
      <div className={`kfk-mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="drawer-content">
          <div className="drawer-header">
            <Image src="/img/logo.png" alt="KFK" width={100} height={32} />
            <button className="drawer-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="drawer-body">
            <nav className="mobile-nav-links">
              <Link href="/djalabiya-house" onClick={() => setIsMobileMenuOpen(false)}>
                DJALABIYA HOUSE
              </Link>
              <Link href="/accessories" onClick={() => setIsMobileMenuOpen(false)}>
                ACCESSOIRES
              </Link>
              <Link href="/look-and-drip" onClick={() => setIsMobileMenuOpen(false)}>
                LOOK & DRIP
              </Link>
              <Link href="/signature" onClick={() => setIsMobileMenuOpen(false)}>
                SIGNATURE
              </Link>
              <Link href="/packs" onClick={() => setIsMobileMenuOpen(false)} className="gold-text">
                PACKS KFK
              </Link>
              <hr className="drawer-divider" />
              <Link href="/vip-club" onClick={() => setIsMobileMenuOpen(false)}>
                KFK VIP CLUB
              </Link>
              <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>
                MON COMPTE
              </Link>
            </nav>
          </div>

          <div className="drawer-footer">
            <p className="slogan">COMMAND YOUR DESTINY</p>
          </div>
        </div>
      </div>
    </header>
  );
}