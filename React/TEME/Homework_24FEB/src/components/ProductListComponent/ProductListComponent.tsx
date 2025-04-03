import React, { JSX } from "react";
import ProductItemComponent from "./ProductItemComponent";
import { products } from "../../constants/products";

const ProductListComponent: React.FC = (): JSX.Element => {
  return (
    <>
      {products.map((product) => {
        return <ProductItemComponent product={product} />;
      })}
    </>
  );
};

export default ProductListComponent;
