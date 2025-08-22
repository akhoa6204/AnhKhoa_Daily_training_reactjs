import { Box, Alert, Typography, Grid } from "@mui/material";
import ProductItem from "../../components/ProductItem";
import ProductSkeleton from "../../components/ProductSkeleton";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { toggleToFavourite } from "../../redux/slice/favouriteList.slice";
import type { IProduct } from "../../interface/product";
import type { Status } from "../../interface/status";

const ProductList = ({
  products,
  status = "loading",
}: {
  products: IProduct[];
  status: Status;
}) => {
  const favouriteList = useAppSelector((state) => state.favouriteList.items);
  const dispatch = useAppDispatch();

  const handleToggleToFavourite = (product: IProduct) =>
    dispatch(toggleToFavourite(product));

  if (status === "error") {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Failed to load products. Please try again.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      {/* Case 2: loaded but no data */}
      {status === "success" && products.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          fontWeight={700}
        >
          No products found.
        </Typography>
      )}

      {/* Case 3: has data */}
      {products.length > 0 && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductItem
                product={product}
                wished={favouriteList.some((item) => item.id === product.id)}
                onToggleWish={handleToggleToFavourite}
                onAddToCart={(p) => console.log("add", p)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Case 1: loading */}
      {status === "loading" && (
        <Grid container spacing={2}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductSkeleton />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductList;
