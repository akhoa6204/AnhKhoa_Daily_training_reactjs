import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import ProductService from "../services/ProductService";
import useQuery, { defaultQuery } from "../hooks/useQuery";
import { useEffect } from "react";
import Product from "../components/Product";
import type { IProduct } from "../interface/product";
import ProductSkeleton from "../components/ProductSkeleton";

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login", { replace: true });
  };
  const { query } = useQuery(defaultQuery);
  const { data, status } = useApi(
    (signal) => ProductService.getProducts(query, signal),
    {
      auto: true,
      deps: [query],
    }
  );
  useEffect(() => {
    console.log(data?.products);
  }, [data]);

  return (
    <Container>
      <Typography variant="h5" textAlign={"center"} mb={2}>
        Trang chủ
      </Typography>
      <Button onClick={handleLogOut} variant="contained" sx={{ mb: 2 }}>
        Đăng xuất
      </Button>
      <Grid container columnSpacing={2} rowSpacing={2}>
        {data?.products?.map((product: IProduct) => (
          <Grid size={3}>
            <Product key={product.id} product={product} />
          </Grid>
        ))}
        {status === "loading"
          ? Array.from({ length: 8 }).map((_, i) => (
              <Grid size={3} key={i}>
                <ProductSkeleton />{" "}
              </Grid>
            ))
          : ""}
      </Grid>
    </Container>
  );
};
export default HomePage;
