import { Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import type { IProduct } from "../../interface/product";
import type { Status } from "../../interface/status";
import { Header } from "./Header";
import { EnhancedProductList } from "./EnhancedProductList";

export default function FavouritesPage() {
  const favourites = useAppSelector((s) => s.favouriteList.items) as IProduct[];

  const [status, setStatus] = React.useState<Status>("loading");

  useEffect(() => {
    const timer = setTimeout(() => setStatus("success"), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Stack spacing={2}>
        <Header favouritesCount={favourites.length} />
        <EnhancedProductList products={favourites} status={status} />
      </Stack>
    </Container>
  );
}
