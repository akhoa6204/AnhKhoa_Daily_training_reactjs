import {Stack } from "@mui/material";
import type { IProduct } from "../../interface/product";
import ProductItemList from "./ProductItemList";

type Props = {
  products: IProduct[];
  onToggleWish: (p: IProduct) => void;
  onAddToCart: (p: IProduct) => void;
};

export default function ProductList({
  products,
  onToggleWish,
  onAddToCart,
}: Props) {
  return (
    <Stack spacing={1}>
      {products.map((product) => (
        <ProductItemList
          key={product.id}
          product={product}
          onToggleWish={onToggleWish}
          onAddToCart={onAddToCart}
        />
      ))}
    </Stack>
  );
}
