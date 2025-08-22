import * as React from "react";
import { Box, Button, Chip, Stack, Typography, Rating } from "@mui/material";
import type { IProduct } from "../../interface/product";
import { formatUSD } from "../../utils/common";

interface ProductItemListProps {
  product: IProduct;
  onToggleWish: (product: IProduct) => void;
  onAddToCart: (product: IProduct) => void;
}

export default function ProductItemList({
  product,
  onToggleWish,
  onAddToCart,
}: ProductItemListProps) {
  const price = typeof product.price === "number" ? product.price : 0;
  const discount = Math.max(0, Math.min(100, product.discountPercentage ?? 0));
  const finalPrice = price * (1 - discount / 100);

  const ratingValue = Number(product.rating) || 0;
  const reviewsCount = product.reviews?.length ?? 0;

  return (
    <Box
      sx={{
        p: 1.5,
        border: (t) => `1px solid ${t.palette.divider}`,
        borderRadius: 2,
        display: "flex",
        gap: 1.5,
        alignItems: { xs: "flex-start", sm: "center" },
        flexWrap: { xs: "wrap", sm: "nowrap" }, // mobile: wrap to next line
      }}
    >
      {/* 1) Thumbnail (fixed size) */}
      <Box
        component="img"
        src={product.thumbnail}
        alt={product.title}
        sx={{
          width: 88,
          height: 88,
          objectFit: "cover",
          borderRadius: 1.5,
          border: (t) => `1px solid ${t.palette.divider}`,
          flexShrink: 0,
          bgcolor: "background.paper",
        }}
        loading="lazy"
      />

      {/* 2) Content (fills remaining space) */}
      <Stack spacing={0.75} sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
          <Typography fontWeight={700} sx={{ mr: 0.5 }}>
            {product.title}
          </Typography>
          {product.brand && (
            <Typography variant="body2" color="text.secondary">
              · {product.brand}
            </Typography>
          )}
          {/* Status chip, pushes to the right */}
          {product.availabilityStatus && (
            <Chip
              label={product.availabilityStatus}
              size="small"
              variant="outlined"
              sx={{ ml: "auto" }}
            />
          )}
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Rating value={ratingValue} precision={0.1} readOnly size="small" />
          <Typography variant="caption" color="text.secondary">
            {ratingValue.toFixed(1)} ({reviewsCount}{" "}
            {reviewsCount === 1 ? "review" : "reviews"})
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="baseline"
          flexWrap="wrap"
        >
          <Typography fontWeight={800}>
            {formatUSD(discount ? finalPrice : price)}
          </Typography>
          {discount > 0 && (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                {formatUSD(price)}
              </Typography>
              <Chip
                label={`-${discount}%`}
                size="small"
                color="error"
                variant="outlined"
              />
            </>
          )}
        </Stack>

        <Typography variant="body2" color="text.secondary" noWrap>
          {product.category && <>Category: {product.category} · </>}
          {product.sku && <>SKU: {product.sku} · </>}
          Stock: {product.stock}
        </Typography>
      </Stack>

      {/* 3) Actions (right column, aligned to the end) */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          ml: { xs: 0, sm: "auto" },
          width: { xs: "100%", sm: "auto" },
          justifyContent: { xs: "flex-end", sm: "flex-start" },
        }}
      >
        <Button
          size="small"
          variant="outlined"
          onClick={() => onToggleWish(product)}
        >
          Remove
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </Stack>
    </Box>
  );
}
