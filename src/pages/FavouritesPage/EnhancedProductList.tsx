import * as React from "react";
import { Alert, Box, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import type { IProduct } from "../../interface/product";
import type { Status } from "../../interface/status";
import { toggleToFavourite } from "../../redux/slice/favouriteList.slice";
import { EmptyState } from "./EmptyState";
import ProductList from "./ProductList";
import FavoritesToolbar from "./FavoritesToolbar";
import ProductGrid from "./ProductGrid";
import ProductSkeletonGrid from "./ProductSkeletonGrid";
type SortKey = "new" | "priceAsc" | "priceDesc";
type ViewMode = "grid" | "list";
export function EnhancedProductList({
  products,
  status = "loading",
}: {
  products: IProduct[];
  status: Status;
}) {
  const dispatch = useAppDispatch();
  const favouriteList = useAppSelector(
    (s) => s.favouriteList.items
  ) as IProduct[];

  // ----- UI state -----
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortKey>("new");
  const [view, setView] = React.useState<ViewMode>("grid");

  const handleToggleToFavourite = (product: IProduct) =>
    dispatch(toggleToFavourite(product));

  const handleClearAll = () => {
    favouriteList.forEach((p) => dispatch(toggleToFavourite(p)));
  };

  const sorted = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((p) => {
      if (!normalizedQuery) return true;
      const name = (p.title || "").toLowerCase();
      const brand = (p.brand || "").toLowerCase();
      return name.includes(normalizedQuery) || brand.includes(normalizedQuery);
    });
    return filtered.sort((a, b) => {
      switch (sort) {
        case "priceAsc":
          return (a.price ?? 0) - (b.price ?? 0);
        case "priceDesc":
          return (b.price ?? 0) - (a.price ?? 0);
        default:
          return (b.id ?? 0) - (a.id ?? 0);
      }
    });
  }, [products, query, sort]);

  if (status === "error") {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Có lỗi khi tải danh sách sản phẩm. Vui lòng thử lại.
        </Alert>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      <FavoritesToolbar
        query={query}
        sort={sort}
        view={view}
        itemsCount={products.length}
        onQueryChange={setQuery}
        onSortChange={setSort}
        onToggleView={() => setView((v) => (v === "grid" ? "list" : "grid"))}
        onClearAll={handleClearAll}
      />

      {status === "loading" && <ProductSkeletonGrid count={8} />}

      {status === "success" && products.length === 0 && <EmptyState />}

      {status === "success" &&
        sorted.length > 0 &&
        (view === "grid" ? (
          <ProductGrid
            products={sorted}
            onToggleWish={handleToggleToFavourite}
            onAddToCart={(p) => console.log("add", p)}
          />
        ) : (
          <ProductList
            products={sorted}
            onToggleWish={handleToggleToFavourite}
            onAddToCart={(p) => console.log("add", p)}
          />
        ))}
    </Stack>
  );
}
