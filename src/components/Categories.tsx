"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: "ville",
    name: "CITY E-BIKES",
    subName: "VILLE",
    link: "/categorie/ville",
    image: "/img/city.jpg", // Remplace par tes images
    buttonText: "Entdecken",
  },
  {
    id: "vtc",
    name: "TREKKING E-BIKES",
    subName: "VTC",
    link: "/categorie/vtc",
    image: "/img/TREKKING.jpg",
    buttonText: "Entdecken",
  },
  {
    id: "vtt",
    name: "E-MOUNTAINBIKES",
    subName: "VTT",
    link: "/categorie/vtt",
    image: "/img/E-MOUNTAINBIKES.jpg",
    buttonText: "Entdecken",
  },
];

export default function CategorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animation Reveal progressive au défilement
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

    const elements = sectionRef.current?.querySelectorAll(
      ".KUN FAYA KUN-reveal",
    );
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="KUN FAYA KUN-categories-section" ref={sectionRef}>
      <div className="KUN FAYA KUN-categories-container">
        {/* En-tête centré */}
        <div className="KUN FAYA KUN-categories-header KUN FAYA KUN-reveal">
          <span className="KUN FAYA KUN-categories-subtitle">
            UNSERE KATEGORIEN
          </span>
          <h2 className="KUN FAYA KUN-categories-title">
            KATEGORIEN FÜR JEDEN FAHRSTIL
          </h2>
        </div>

        {/* Grille des 3 catégories (Style 2ème image) */}
        <div className="KUN FAYA KUN-categories-grid">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className={`KUN FAYA KUN-category-card KUN FAYA KUN-reveal delay-${index + 1}`}
            >
              <div className="KUN FAYA KUN-category-image-wrapper">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="KUN FAYA KUN-category-img"
                />
                <div className="KUN FAYA KUN-category-overlay"></div>
              </div>

              {/* Textes et Bouton centrés sur la carte */}
              <div className="KUN FAYA KUN-category-content">
                <span className="KUN FAYA KUN-category-badge">
                  {cat.subName}
                </span>
                <h3 className="KUN FAYA KUN-category-name">{cat.name}</h3>
                <Link href={cat.link} className="KUN FAYA KUN-category-btn">
                  {cat.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
