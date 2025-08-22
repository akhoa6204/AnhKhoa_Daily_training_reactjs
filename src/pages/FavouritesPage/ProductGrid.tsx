import * as React from "react";
import ProductItem from "../../components/ProductItem";
import type { IProduct } from "../../interface/product";
import { Grid } from "@mui/material";

type Props = {
  products: IProduct[];
  onToggleWish: (p: IProduct) => void;
  onAddToCart: (p: IProduct) => void;
};

export default function ProductGrid({
  products,
  onToggleWish,
  onAddToCart,
}: Props) {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ProductItem
            product={product}
            wished={true}
            onToggleWish={onToggleWish}
            onAddToCart={onAddToCart}
          />
        </Grid>
      ))}
    </Grid>
  );
}
