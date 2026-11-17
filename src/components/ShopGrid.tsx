"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import {
  productsData,
  getProductsByDepartment,
  type Product,
} from "@/data/products";
import { siteConfig } from "@/config/site";

type FilterType =
  | "all"
  | "JALABIYA-house"
  | "accessories"
  | "look-and-drip"
  | "signature"
  | "packs";

interface ShopGridProps {
  initialProducts?: Product[];
  departmentId?: string;
}

export default function ShopGrid({
  initialProducts,
  departmentId,
}: ShopGridProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "newest"
  >("featured");

  const baseProducts = useMemo(() => {
    if (initialProducts && initialProducts.length > 0) {
      return initialProducts;
    }
    if (departmentId) {
      return getProductsByDepartment(departmentId as Product["department"]);
    }
    return productsData;
  }, [initialProducts, departmentId]);

  const filteredProducts = useMemo(() => {
    let result: Product[] =
      filter === "all" ? baseProducts : getProductsByDepartment(filter);

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = [...result].sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "featured":
      default:
        // Featured first (badged items), then rest
        result = [...result].sort((a, b) => {
          const aFeatured =
            a.badge || a.isLimitedEdition || a.isVipExclusive ? 1 : 0;
          const bFeatured =
            b.badge || b.isLimitedEdition || b.isVipExclusive ? 1 : 0;
          return bFeatured - aFeatured;
        });
        break;
    }

    return result;
  }, [filter, sortBy, baseProducts]);

  const departments = [
    { value: "all", label: "All Collections" },
    { value: "JALABIYA-house", label: "JALABIYA House" },
    { value: "accessories", label: "Accessories" },
    { value: "look-and-drip", label: "Look & Drip" },
    { value: "signature", label: "Signature" },
    { value: "packs", label: "KFK Packs" },
  ];

  return (
    <div className="shop-grid-container">
      {/* Filter & Sort Bar */}
      <div className="shop-toolbar">
        <div className="shop-filter">
          <label htmlFor="department-filter" className="visually-hidden">
            Filter by department
          </label>
          <select
            id="department-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
            className="shop-select"
          >
            {departments.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
        </div>

        <div className="shop-sort">
          <label htmlFor="sort-select" className="visually-hidden">
            Sort by
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="shop-select"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="shop-count" aria-live="polite">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"} found
        </div>
      </div>

      {/* Product Grid */}
      <div
        className="storefront-product-grid"
        role="list"
        aria-label="Product listing"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="shop-empty" role="status">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <p>No products match your filters.</p>
            <button onClick={() => setFilter("all")} className="btn-reset">
              Show All
            </button>
          </div>
        )}
      </div>

      {/* Pagination placeholder - future enhancement */}
      {filteredProducts.length > 12 && (
        <div className="shop-pagination">
          <button
            className="pagination-btn"
            disabled
            aria-label="Previous page"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <span className="pagination-current">Page 1</span>
          <button className="pagination-btn" aria-label="Next page">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}
