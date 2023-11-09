import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "@asset/component/ProductCard.scss";

const ProductCardSkeleton = () => {
  return <Skeleton className="product-card" />;
};

export default ProductCardSkeleton;
