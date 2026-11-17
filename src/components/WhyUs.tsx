"use client";

import { useEffect, useState, useRef } from "react";
import { siteConfig } from "@/config/site";

interface Feature {
  icon: string;
  title: string;
  description: string;
  active?: boolean;
}

const features: Feature[] = [
  {
    icon: "fa-solid fa-truck-fast",
    title: "Livraison Internationale",
    description: "Livraison au Bénin, en Afrique et à l'international. Où que vous soyez, KFK vous rejoint.",
    active: true,
  },
  {
    icon: "fa-solid fa-award",
    title: "Qualité Premium",
    description: "Tissus sélectionnés, mouvements suisses, cuir italien, parfums signature. Aucun compromis.",
  },
  {
    icon: "fa-solid fa-shield-halved",
    title: "Paiement Sécurisé",
    description: "Virement bancaire et paiement par carte (bientôt). Entièrement chiffré, zéro risque.",
  },
  {
    icon: "fa-solid fa-headset",
    title: "Service Personnel",
    description: "KFK Personal Stylist : donnez budget + occasion, nous composons votre look complet. Support VIP prioritaire.",
  },
];

interface Stat {
  id: string;
  target: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { id: "clients", target: 5000, suffix: "+", label: "CLIENTS SATISFAITS" },
  { id: "orders", target: 12000, suffix: "+", label: "COMMANDES EXPÉDIÉES" },
  { id: "countries", target: 25, suffix: "+", label: "PAYS DESSERVIS" },
  { id: "collections", target: 12, suffix: "", label: "COLLECTIONS EXCLUSIVES" },
];

export default function WhyUs() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    clients: 0,
    orders: 0,
    countries: 0,
    collections: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateStats();
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateStats = () => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounts({
        clients: Math.floor(progress * 5000),
        orders: Math.floor(progress * 12000),
        countries: Math.floor(progress * 25),
        collections: Math.floor(progress * 12),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({
          clients: 5000,
          orders: 12000,
          countries: 25,
          collections: 12,
        });
      }
    }, intervalTime);
  };

  return (
    <section className="whyus-section" ref={sectionRef} aria-labelledby="whyus-title">
      <div className="whyus-container">
        {/* Header */}
        <div className="whyus-header">
          <h2 id="whyus-title" className="whyus-title">Pourquoi KFK</h2>
          <p className="whyus-subtitle">
            Quatre promesses. Une marque lifestyle.
          </p>
          <div className="whyus-line"></div>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div
                className={`feature-icon-wrap ${feature.active ? "active" : ""}`}
              >
                <i className={feature.icon} aria-hidden="true"></i>
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Animated Stats Banner */}
        <div className="stats-banner" aria-label="Statistiques KFK">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-item">
              <div className="stat-number">
                {counts[stat.id].toLocaleString("fr-FR")}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}