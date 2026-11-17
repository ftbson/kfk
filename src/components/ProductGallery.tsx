"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";

export default function ProductGallery({ product }: { product: Product }) {
  const images = Array.from(new Set([product.image, ...(product.images ?? [])]));
  const [activeImage, setActiveImage] = useState(images[0]);
  const [unavailableImages, setUnavailableImages] = useState<string[]>([]);

  const markImageUnavailable = (image: string) => {
    setUnavailableImages((current) =>
      current.includes(image) ? current : [...current, image],
    );
  };

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        {unavailableImages.includes(activeImage) ? (
          <div className="product-image-placeholder" role="img" aria-label={product.title}>
            <i className="fa-solid fa-shirt" aria-hidden="true" />
            <span>KFK</span>
          </div>
        ) : (
          <Image
            src={activeImage}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 55vw"
            className="product-gallery-image"
            onError={() => markImageUnavailable(activeImage)}
          />
        )}
        {product.badge && (
          <span className="product-gallery-badge">
            {product.isLimitedEdition && product.limitedEditionNumber
              ? `Édition limitée · ${product.limitedEditionNumber} pièces`
              : product.badge}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="product-gallery-thumbnails" aria-label="Photos du produit">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={`product-gallery-thumbnail ${activeImage === image ? "active" : ""}`}
              onClick={() => setActiveImage(image)}
              aria-label={`Afficher la photo ${index + 1}`}
              aria-pressed={activeImage === image}
            >
              {unavailableImages.includes(image) ? (
                <i className="fa-solid fa-image" aria-hidden="true" />
              ) : (
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="88px"
                  onError={() => markImageUnavailable(image)}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
