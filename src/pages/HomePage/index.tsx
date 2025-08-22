import * as React from "react";
import { useState, useMemo } from "react";
import { Container, Divider } from "@mui/material";
import useQuery from "../../hooks/useQuery";
import type { IParams } from "../../interface/params";
import { ENDPOINT_URL } from "../../constant";
import useFetchList from "../../hooks/useFetchList";
import ProductList from "./ProductList";
import SearchHero from "./SearchHero";
import ResultsHeader from "./ResultsHeader";
import SeeMoreBar from "./SeeMoreBar";

const PAGE_SIZE = 8;
const defaultQuery: IParams = { limit: PAGE_SIZE, q: "" };
const trendingKeywords = ["iphone", "laptop", "makeup", "watch", "sneakers"];

export default function HomePage() {
  const { query, updateQuery } = useQuery(defaultQuery);
  const [search, setSearch] = useState(query.q ?? "");
  const isSearching = !!query.q?.trim();

  const url = isSearching
    ? ENDPOINT_URL.PRODUCTS_SEARCH
    : ENDPOINT_URL.PRODUCTS;

  const {
    data: products = [],
    status,
    hasSeeMore,
  } = useFetchList({
    url,
    params: isSearching
      ? { q: query.q, limit: query.limit }
      : { limit: query.limit },
  });

  // derived
  const resultsText = useMemo(() => {
    if (status === "loading") return "Loading…";
    if (status === "error") return "An error occurred";
    return `${products.length} result${products.length === 1 ? "" : "s"} for “${
      query.q
    }”`;
  }, [status, products.length, query.q]);

  // handlers
  const handleFindProduct = () => {
    updateQuery({ q: search.trim(), limit: PAGE_SIZE });
  };
  const handleClearSearch = () => {
    setSearch("");
    updateQuery({ q: "", limit: PAGE_SIZE });
  };
  const handleSeeMore = () => {
    const next = Number(query.limit || PAGE_SIZE) + PAGE_SIZE;
    updateQuery({ ...query, limit: next });
  };
  const handlePickTrending = (kw: string) => {
    setSearch(kw);
    updateQuery({ q: kw, limit: PAGE_SIZE });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
      <SearchHero
        search={search}
        isSearching={isSearching}
        trendingKeywords={trendingKeywords}
        onChangeSearch={setSearch}
        onSubmit={handleFindProduct}
        onClear={handleClearSearch}
        onPickTrending={handlePickTrending}
      />

      <ResultsHeader
        visible={isSearching}
        resultsText={resultsText}
        onClearSearch={handleClearSearch}
      />

      <Divider sx={{ mb: 2 }} />

      <ProductList products={products} status={status} />

      <SeeMoreBar
        visible={hasSeeMore && status === "success"}
        onClick={handleSeeMore}
      />
    </Container>
  );
}
