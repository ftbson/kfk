"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface Hotspot {
  id: string;
  label: string;
  top: string;
  left: string;
  link: string;
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  imageLeft: string;
  imageRight: string;
  ctaText: string;
  ctaLink: string;
  hotspots?: Hotspot[];
}

const heroSlides: Slide[] = siteConfig.departments
  .slice(0, 4)
  .map((dept, idx) => ({
    id: idx + 1,
    title: dept.hero.title,
    subtitle: dept.hero.subtitle,
    category: dept.hero.category,
    imageLeft:
      dept.id === "JALABIYA-house"
        ? "/img/jalabiya.jpg"
        : dept.id === "accessories"
          ? "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
          : dept.id === "look-and-drip"
            ? "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
            : "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop",
    imageRight:
      dept.id === "JALABIYA-house"
        ? "/img/jalabiya2.jpg"
        : dept.id === "accessories"
          ? "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop"
          : dept.id === "look-and-drip"
            ? "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop"
            : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    ctaText: dept.hero.ctaText,
    ctaLink: dept.hero.ctaLink,
    hotspots: [
      { id: "h1", label: dept.name, top: "42%", left: "58%", link: dept.hero.ctaLink }
    ]
  }));

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Reveal effect on initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance slides every 6 seconds
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
      aria-label="Carrousel hero KFK"
    >
      {/* Main Split-Screen Container */}
      <div className="hero-split-container">
        
        {/* Left Side of Split */}
        <div className="hero-side hero-side-left">
          <div
            className="hero-bg-image"
            style={{ backgroundImage: `url(${slide.imageLeft})` }}
            aria-hidden="true"
          >
            <div className="hero-overlay-gradient"></div>
          </div>
        </div>

        {/* Right Side of Split */}
        <div className="hero-side hero-side-right">
          <div
            className="hero-bg-image"
            style={{ backgroundImage: `url(${slide.imageRight})` }}
            aria-hidden="true"
          >
            <div className="hero-overlay-gradient"></div>
          </div>

          {/* Hotspots interactifs sur l'image (inspiré de la référence) */}
          {slide.hotspots?.map((spot) => (
            <Link
              key={spot.id}
              href={spot.link}
              className="hero-hotspot-badge"
              style={{ top: spot.top, left: spot.left }}
            >
              <span>{spot.label}</span>
            </Link>
          ))}
        </div>

        {/* Floating Central Content (Titles, Slogan, CTA) */}
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
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>

        {/* Indicateurs en bas à droite (Style exact inspiré de la capture) */}
        <div className="hero-bottom-controls">
          <div className="hero-dots" role="tablist" aria-label="Indicateurs de diapositives">
            {heroSlides.map((s, idx) => (
              <button
                key={s.id}
                className={`hero-dot ${idx === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(idx)}
                role="tab"
                aria-selected={idx === currentSlide}
                aria-label={`Aller à la diapositive ${idx + 1}`}
              ></button>
            ))}
          </div>

          {/* Bouton Play / Pause interactif */}
          <button 
            className="hero-pause-play-btn"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Reprendre le carrousel" : "Mettre en pause le carrousel"}
          >
            <i className={isPaused ? "fa-solid fa-play" : "fa-solid fa-pause"} aria-hidden="true"></i>
          </button>
        </div>

      </div>
    </section>
  );
}