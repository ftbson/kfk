"use client";

import { useState } from "react";

interface Testimonial {
  id: number;
  rating: number;
  quote: string;
  initials: string;
  name: string;
  city: string;
  country: string;
  product?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    quote:
      '"Le Gentleman Pack a changé ma façon de m\'habiller pour le travail. Tranchant, complet, sans effort. Un clic et je suis prêt pour toute réunion."',
    initials: "A",
    name: "Ahmed K.",
    city: "Cotonou",
    country: "Bénin",
    product: "Gentleman Pack",
  },
  {
    id: 2,
    rating: 5,
    quote:
      '"Friday Pack est parfait pour la prière du vendredi et au-delà. La JALABIYA tombe parfaitement, le parfum tient toute la journée. Une qualité qu\'on ressent."',
    initials: "I",
    name: "Ibrahim S.",
    city: "Lagos",
    country: "Nigéria",
    product: "Friday Pack",
  },
  {
    id: 3,
    rating: 5,
    quote:
      '"Drip Pack est devenu mon uniforme quotidien. Jogger, sneakers, lunettes - confort et style. On me demande où j\'ai trouvé ce look."',
    initials: "K",
    name: "Kofi A.",
    city: "Accra",
    country: "Ghana",
    product: "Drip Pack",
  },
  {
    id: 4,
    rating: 5,
    quote:
      '"Executive Pack pour la salle de conseil. La coupe du costume, le chronographe, la sacoche - j\'entre et je commande la pièce."',
    initials: "M",
    name: "Moussa D.",
    city: "Abidjan",
    country: "Côte d'Ivoire",
    product: "Executive Pack",
  },
  {
    id: 5,
    rating: 5,
    quote:
      '"KFK N°1 est ma signature olfactive maintenant. Complexe, masculin, tient 12h+. Le flacon numéroté le rend unique."',
    initials: "Y",
    name: "Youssef M.",
    city: "Dakar",
    country: "Sénégal",
    product: "KFK N°1 Parfum",
  },
  {
    id: 6,
    rating: 5,
    quote:
      "\"L'accès anticipé VIP Club m'a permis d'avoir la JALABIYA édition limitée avant rupture. Le styliste personnel a composé mon look de l'Aïd. Service d'élite.\"",
    initials: "O",
    name: "Omar B.",
    city: "Casablanca",
    country: "Maroc",
    product: "VIP Club",
  },
  {
    id: 7,
    rating: 5,
    quote:
      '"Livraison internationale vers Londres sans accroc. Le packaging est premium, le déballage est un événement. KFK pense à tout."',
    initials: "H",
    name: "Hassan R.",
    city: "Londres",
    country: "Royaume-Uni",
    product: "Commande Internationale",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  const currentTestimonials = testimonials.slice(
    activeIndex * itemsPerSlide,
    (activeIndex + 1) * itemsPerSlide,
  );

  return (
    <section
      className="testimonials-section"
      aria-labelledby="testimonials-title"
    >
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <h2 id="testimonials-title" className="testimonials-title">
            Ce Que Disent Nos Clients
          </h2>
          <p className="testimonials-subtitle">
            Vrais témoignages de la fraternité KFK à travers le monde.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="testimonials-grid" role="list">
          {currentTestimonials.map((item) => (
            <article key={item.id} className="testimonial-card" role="listitem">
              {/* Rating */}
              <div
                className="testimonial-stars"
                aria-label={`${item.rating} étoiles sur 5`}
              >
                {[...Array(item.rating)].map((_, i) => (
                  <i
                    key={i}
                    className="fa-solid fa-star"
                    aria-hidden="true"
                  ></i>
                ))}
              </div>

              {/* Quote */}
              <p className="testimonial-quote">"{item.quote}"</p>

              {/* Product badge */}
              {item.product && (
                <span className="testimonial-product">{item.product}</span>
              )}

              {/* Author */}
              <div className="testimonial-author">
                <div className="author-avatar" aria-hidden="true">
                  {item.initials}
                </div>
                <div className="author-info">
                  <h4 className="author-name">{item.name}</h4>
                  <span className="author-location">
                    {item.city}, {item.country}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Dots */}
        <div
          className="testimonials-pagination"
          role="tablist"
          aria-label="Diapositives témoignages"
        >
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Aller à la diapositive témoignage ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
