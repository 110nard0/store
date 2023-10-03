import React from "react";

import "../assets/styles/pages/ProductsPage.scss";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";

const ProductsPage = () => {
  return (
    <section className="products">
      <div className="products_header">
        <p className="products_header__heading">All products</p>
        <div className="products_filter">
          <Filter />
        </div>
      </div>

      <div className="products_display">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};

export default ProductsPage;
