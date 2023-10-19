import React from "react";

import "../assets/styles/pages/ProductsPage.scss";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import MetaTag from "../components/MetaTag";
import FixedPosition from "../components/FixedPosition";

const products = Array.from({ length: 9 });

const ProductsPage = () => {
  return (
    <section className="products">
      <FixedPosition className="products_header">
        <p className="products_header__heading">All products</p>
        <div className="products_filter">
          <Filter />
        </div>
      </FixedPosition>

      <div className="products_display">
        {products.map((_, i) => (
          <ProductCard key={i} id={i + 1} />
        ))}
      </div>
      {/* ================================ METATAG ================================= */}
      <MetaTag
        title="TRGST: All Collections"
        description="All New designs of the TRGST website"
      />
    </section>
  );
};

export default ProductsPage;
