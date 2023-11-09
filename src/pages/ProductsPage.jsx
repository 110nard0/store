import React from "react";

import "@asset/pages/ProductsPage.scss";
import ProductCard from "@components/ProductCard.jsx";
import Filter from "@components/Filter.jsx";
import MetaTag from "@components/MetaTag.jsx";
import ProductCardSkeleton from "@components/ProductCardSkeleton";

const products = Array.from({ length: 9 });

const isLoading = false;

HINT: "Use a custom useData hook to destructure the data, error and loading state, use the destructure ";

TODO: "Use the destruture value instead";

const ProductsPage = () => {
  return (
    <section className="products">
      <div className="products_header">
        <h2 className="products_header__heading">All products</h2>
        <div className="products_filter">
          <Filter />
        </div>
      </div>

      <div className="products_display">
        {isLoading &&
          products.map((_, i) => <ProductCardSkeleton key={i + "Skeletion"} />)}

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
