"use client";

import React, { useState } from "react";
import Link from "next/link";

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

  return (
    <footer className="kfk-footer">
      <div className="kfk-footer-container">
        
        {/* SECTION HAUTE : NEWSLETTER & INFOS IMPORTANTES */}
        <div className="kfk-footer-top">
          
          {/* Bloc Newsletter */}
          <div className="footer-newsletter">
            <h3>REJOIGNEZ L'UNIVERS KFK</h3>
            <p>Abonnez-vous pour ne manquer aucune info sur nos drops, releases et exclusivités.</p>
            
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Votre adresse e-mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <button type="submit" className="subscribe-btn">
                S'INSCRIRE
              </button>
            </form>
            {subscribed && (
              <span className="success-msg">Merci pour votre inscription au KFK Club.</span>
            )}
          </div>

          {/* Liens Rapides : Service Client */}
          <div className="footer-links-col">
            <h4>Service Client</h4>
            <ul>
              <li><Link href="/contact">Nous contacter</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/shipping">Livraison</Link></li>
              <li><Link href="/returns">Demande de retour</Link></li>
            </ul>
          </div>

          {/* Liens Rapides : Informations & Légal */}
          <div className="footer-links-col">
            <h4>Informations</h4>
            <ul>
              <li><Link href="/about">À propos</Link></li>
              <li><Link href="/cgv">CGV</Link></li>
              <li><Link href="/privacy">Politique de confidentialité</Link></li>
              <li><Link href="/legal">Mentions légales</Link></li>
            </ul>
          </div>

          {/* Réseaux Sociaux */}
          <div className="footer-links-col">
            <h4>Suivez-nous</h4>
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i> Instagram
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <i className="fa-brands fa-tiktok"></i> TikTok
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i> Facebook
              </a>
            </div>
          </div>

        </div>

        {/* SECTION BASSE : EFFET TYPO GIGANTESQUE EN BAS (Style Minimaliste Luxe) */}
        <div className="kfk-footer-bottom-brand">
          <div className="giant-logo-text">
            <span>KUN FAYA KUN</span>
          </div>
          
          <div className="footer-sub-bar">
            <p>© {new Date().getFullYear()} KFK — COMMAND YOUR DESTINY. Tous droits réservés.</p>
            <div className="footer-sub-links">
              <Link href="/privacy">Confidentialité</Link>
              <Link href="/terms">Termes</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}