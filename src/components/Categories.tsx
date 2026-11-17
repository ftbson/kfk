"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function CategorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animation progressive au défilement (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    const elements = sectionRef.current?.querySelectorAll(".kfk-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="kfk-categories-section" ref={sectionRef} aria-labelledby="categories-title">
      <div className="kfk-categories-container">
        
        {/* En-tête de section centré */}
        <div className="kfk-categories-header kfk-reveal">
          <span className="kfk-categories-subtitle">
            {siteConfig.brand.name} DÉPARTEMENTS
          </span>
          <h2 id="categories-title" className="kfk-categories-title">
            CINQ MONDES. UNE DESTINÉE.
          </h2>
        </div>

        {/* Grille des départements (4 colonnes alignées sur PC) */}
        <div className="kfk-categories-grid">
          {siteConfig.departments.map((dept, index) => (
            <div
              key={dept.id}
              className={`kfk-category-card kfk-reveal delay-${index + 1}`}
            >
              {/* Image de fond */}
              <div className="kfk-category-image-wrapper">
                <img
                  src={
                    dept.id === "djalabiya-house"
                      ? "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
                      : dept.id === "accessories"
                      ? "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
                      : dept.id === "look-and-drip"
                      ? "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
                      : dept.id === "signature"
                      ? "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop"
                      : "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
                  }
                  alt={dept.name}
                  className="kfk-category-img"
                />
                <div className="kfk-category-overlay"></div>
              </div>

              {/* Contenu éditorial (Titre + Bouton Pilule) */}
              <div className="kfk-category-content">
                <h3 className="kfk-category-name">{dept.name}</h3>
                <Link
                  href={dept.id === "packs" ? "/packs" : `/categorie/${dept.id}`}
                  className="kfk-category-pill-btn"
                >
                  Acheter
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}