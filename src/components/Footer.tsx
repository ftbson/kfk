"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const { footer, brand, contact } = siteConfig;

  return (
    <footer className="kfk-footer" role="contentinfo">
      <div className="kfk-footer-container">

        {/* TOP SECTION: NEWSLETTER & QUICK LINKS */}
        <div className="kfk-footer-top">

          {/* Newsletter Block */}
          <div className="footer-newsletter">
            <h3>REJOIGNEZ L'UNIVERS KFK</h3>
            <p>Inscrivez-vous pour ne manquer aucune sortie, lancement ou exclusivité.</p>

            <form onSubmit={handleSubscribe} className="newsletter-form" aria-label="Inscription newsletter">
              <input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Adresse email pour la newsletter"
              />
              <button type="submit" className="subscribe-btn">
                S'INSCRIRE
              </button>
            </form>
            {subscribed && (
              <span className="success-msg" role="status">Merci d'avoir rejoint le KFK Club.</span>
            )}
          </div>

          {/* Footer Columns from config */}
          {footer.columns.map((col, idx) => (
            <div key={idx} className="footer-links-col">
              <h4>{col.title}</h4>
              {('links' in col && col.links) && (
                <ul>
                  {col.links.map((link, i) => (
                    <li key={i}><Link href={link.href}>{link.label}</Link></li>
                  ))}
                </ul>
              )}
              {('socials' in col && col.socials) && (
                <div className="footer-socials">
                  {col.socials.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <i className={`fa-brands fa-${social.icon}`} aria-hidden="true"></i>
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

        </div>

        {/* BOTTOM SECTION: BRAND TYPOGRAPHY + COPYRIGHT */}
        <div className="kfk-footer-bottom-brand">
          <div className="giant-logo-text">
            <span>{brand.name}</span>
          </div>

          <div className="footer-sub-bar">
            <p>{footer.copyright}</p>
            <div className="footer-sub-links">
              {footer.bottomLinks.map((link, i) => (
                <Link key={i} href={link.href}>{link.label}</Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}