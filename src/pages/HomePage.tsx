import { useState } from "react";
import { Button, Container, Stack, TextField } from "@mui/material";
import useQuery, { type IParams } from "../hooks/useQuery";
import useFetchList from "../hooks/useFetchList";
import { ENDPOINT_URL } from "../constant";
import ProductList from "../components/ProductList";

const PAGE_SIZE = 8;
const defaultQuery: IParams = { limit: PAGE_SIZE, q: "" };

export default function HomePage() {
  const { query, updateQuery } = useQuery(defaultQuery);
  const [search, setSearch] = useState("");

  const isSearching = !!query.q?.trim();
  const url = isSearching
    ? ENDPOINT_URL.PRODUCTS_SEARCH
    : ENDPOINT_URL.PRODUCTS;

  const {
    data: products = [],
    isLoading,
    isError,
    hasSeeMore,
  } = useFetchList({
    url,
    params: isSearching
      ? { q: query.q, limit: query.limit }
      : { limit: query.limit },
  });

  const handleFindProduct = () => {
    updateQuery({ q: search.trim(), limit: PAGE_SIZE });
  };

  const handleSeeMore = () => {
    const next = Number(query.limit || PAGE_SIZE) + PAGE_SIZE;
    updateQuery({ ...query, limit: next });
  };

  return (
    <Container sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleFindProduct();
          }}
        />
        <Button variant="contained" onClick={handleFindProduct}>
          Find
        </Button>
      </Stack>

      <ProductList
        products={products}
        isLoading={isLoading}
        isError={isError}
      />
      {hasSeeMore ? (
        <Stack direction="row" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            onClick={handleSeeMore}
            disabled={isLoading}
          >
            See more
          </Button>
        </Stack>
      ) : (
        ""
      )}
    </Container>
  );
}
