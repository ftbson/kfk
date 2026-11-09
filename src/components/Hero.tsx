"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  imageLeft: string;
  imageRight: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
}

const heroSlides: Slide[] = [
  {
    id: 1,
    title: "DJALABIYA HOUSE",
    subtitle: "Tradition & Élégance. L'art du boubou moderne revisité.",
    category: "01. TRADITION",
    imageLeft: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop", // Remplaçable par vos assets
    imageRight: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    ctaText: "Découvrir la collection",
    ctaLink: "/djalabiya-house",
    bgColor: "#0f0f0f",
  },
  {
    id: 2,
    title: "LOOK & DRIP",
    subtitle: "Ensembles, joggings et style urbain maîtrisé.",
    category: "02. STREETWEAR",
    imageLeft: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    imageRight: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop",
    ctaText: "Voir les outfits",
    ctaLink: "/look-and-drip",
    bgColor: "#141414",
  },
  {
    id: 3,
    title: "SIGNATURE & ACCESSOIRES",
    subtitle: "Parfums exclusifs, montres et éditions limitées KFK.",
    category: "03. LUXURY",
    imageLeft: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    imageRight: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop",
    ctaText: "Explorer le luxe",
    ctaLink: "/signature",
    bgColor: "#0d0d0d",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Effet de reveal au chargement initial de la page
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Défilement automatique des slides (tous les 6 secondes)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = heroSlides[currentSlide];

  return (
    <section 
      className={`kfk-hero-section ${isLoaded ? "reveal-loaded" : ""}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Conteneur principal en Split-Screen inspiré des visuels */}
      <div className="hero-split-container">
        
        {/* Partie Gauche du Split */}
        <div className="hero-side hero-side-left">
          <div 
            className="hero-bg-image" 
            style={{ backgroundImage: `url(${slide.imageLeft})` }}
          >
            <div className="hero-overlay-gradient"></div>
          </div>
        </div>

        {/* Partie Droite du Split */}
        <div className="hero-side hero-side-right">
          <div 
            className="hero-bg-image" 
            style={{ backgroundImage: `url(${slide.imageRight})` }}
          >
            <div className="hero-overlay-gradient"></div>
          </div>
        </div>

        {/* Contenu Central Flottant (Titres, Slogan, CTA) */}
        <div className="hero-content-overlay">
          <div className="hero-tag-wrapper">
            <span className="hero-category-tag">{slide.category}</span>
          </div>

          <h1 key={`title-${slide.id}`} className="hero-main-title">
            {slide.title}
          </h1>

          <p key={`sub-${slide.id}`} className="hero-subtitle">
            {slide.subtitle}
          </p>

          <div className="hero-cta-wrapper">
            <Link href={slide.ctaLink} className="hero-cta-btn">
              <span>{slide.ctaText}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Contrôles de navigation et indicateurs de défilement (en bas à droite) */}
        <div className="hero-indicators-bar">
          <button 
            className="hero-nav-arrow"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            aria-label="Slide précédente"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="hero-dots">
            {heroSlides.map((s, idx) => (
              <button
                key={s.id}
                className={`hero-dot ${idx === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Aller au slide ${idx + 1}`}
              ></button>
            ))}
          </div>

          <button 
            className="hero-nav-arrow"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            aria-label="Slide suivante"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

      </div>
    </section>
  );
}