import { Box, Alert, Typography, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";

import ProductItem from "./ProductItem";
import ProductSkeleton from "./ProductSkeleton";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { toggleToFavourite } from "../redux/slice/favouriteList.slice";
import type { IProduct } from "../interface/product";

const ProductList = ({
  products,
  isLoading,
  isError,
}: {
  products: IProduct[];
  isLoading: boolean;
  isError: boolean;
}) => {
  const favouriteList = useAppSelector((state) => state.favouriteList.items);
  const dispatch = useAppDispatch();

  const handleToggleToFavourite = (product: IProduct) =>
    dispatch(toggleToFavourite(product));


  if (isError)
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Có lỗi khi tải danh sách sản phẩm. Vui lòng thử lại.
        </Alert>
      </Box>
    );
  return (
    <Box sx={{ p: 2 }}>
      {!isLoading && !isError && products.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Không có sản phẩm.
        </Typography>
      ) : null}

      {products.length > 0 ? (
        <Grid container spacing={2}>
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
      ) : null}

      {isLoading ? (
        <Grid container spacing={2} mt={2}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Box>
  );
};

export default ProductList;
