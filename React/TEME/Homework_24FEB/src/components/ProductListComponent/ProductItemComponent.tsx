import React, { JSX } from "react";
import { IProductInterface } from "../../interfaces/IProductInterface";

interface IProductItemComponentProps {
  product: IProductInterface;
}
const ProductItemComponent: React.FC<IProductItemComponentProps> = (
  props
): JSX.Element => {
  const {
    product: { id, category, price, name },
    product,
  } = props;
  product;
  return (
    <>
      <div>
        <div>{id}</div>
        <div>{category}</div>
        <div>{name}</div>
        <div>{price}</div>
      </div>
    </>
  );
};

export default ProductItemComponent;
