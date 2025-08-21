import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Stack,
  Button,
  Rating,
  Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import SellIcon from "@mui/icons-material/Sell";
import { discounted, formatUSD } from "../utils/common";
import type { IProduct } from "../interface/product";

export interface ProductItemProps {
  product: IProduct;
  wished?: boolean;
  onToggleWish?: (p: IProduct) => void;
  onAddToCart?: (p: IProduct) => void;
}

const MotionCard = motion.create(Card);

export default function ProductItem({
  product,
  wished,
  onToggleWish,
  onAddToCart,
}: ProductItemProps) {
  const hasDiscount = product.discountPercentage > 0;
  const priceAfter = discounted(product.price, product.discountPercentage);
  const inStock = product.stock > 0;

  return (
    <MotionCard
      elevation={0}
      whileHover={{ y: -6, boxShadow: "0px 8px 30px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      sx={{
        borderRadius: 3,
        border: (t) => `1px solid ${t.palette.divider}`,
        overflow: "hidden",
        position: "relative",
        bgcolor: "background.paper",
      }}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        sx={{ position: "absolute", top: 0, right: 0, left: 0, zIndex: 999 }}
      >
        {/* Discount badge */}
        {hasDiscount && (
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{
              bgcolor: "error.main",
              height: "fit-content",
              color: "white ",
              px: 1,
              borderRadius: 3,
            }}
          >
            <SellIcon sx={{ width: "12px" }} /> - {product.discountPercentage}%
          </Typography>
        )}

        {/* Wishlist button */}
        <Tooltip title={wished ? "Bỏ yêu thích" : "Yêu thích"} placement="left">
          <IconButton
            onClick={() => onToggleWish?.(product)}
            sx={{
              bgcolor: "background.paper",
            }}
            aria-label="wishlist"
          >
            {wished ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </Stack>
      <CardActionArea disableRipple>
        <Box
          sx={{
            position: "relative",
            aspectRatio: "4 / 3",
            bgcolor: "action.hover",
          }}
        >
          <CardMedia
            component="img"
            src={
              product.thumbnail ||
              product.images?.[0] ||
              "https://picsum.photos/640/480"
            }
            alt={product.title}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Top-right mini badges */}
          <Stack
            direction="row"
            spacing={1}
            justifyContent={"flex-end"}
            sx={{ position: "absolute", right: 12, bottom: 12, left: 12 }}
          >
            <Chip
              size="small"
              color={inStock ? "success" : "error"}
              label={
                inStock ? product.availabilityStatus || "Còn hàng" : "Hết hàng"
              }
              variant="filled"
            />
            {product.brand && (
              <Chip
                size="small"
                variant="outlined"
                icon={<VerifiedIcon sx={{ color: "success.main" }} />}
                label={product.brand}
                sx={{
                  bgcolor: "background.paper",
                  border: "none",
                }}
              />
            )}
          </Stack>
        </Box>

        <CardContent sx={{ p: 2.5 }}>
          <Stack spacing={1}>
            <Tooltip title={product.title} placement="top-start">
              <Typography variant="h6" fontWeight={700} noWrap>
                {product.title}
              </Typography>
            </Tooltip>

            {/* Rating */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Rating
                name="read-only"
                value={Number(product.rating) || 0}
                precision={0.1}
                size="small"
                readOnly
              />
              <Typography variant="caption" color="text.secondary">
                {Number(product.rating).toFixed(2)}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Typography variant="caption" color="text.secondary">
                {product.reviews?.length || 0} đánh giá
              </Typography>
            </Stack>

            {/* Price */}
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="h5" fontWeight={800}>
                {formatUSD(priceAfter)}
              </Typography>
              {hasDiscount && (
                <Typography
                  variant="body2"
                  color="text.disabled"
                  sx={{ textDecoration: "line-through" }}
                >
                  {formatUSD(product.price)}
                </Typography>
              )}
            </Stack>

            {/* Shipping & Warranty mini row */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent={"space-between"}
              color="text.secondary"
            >
              <Stack direction="row" spacing={0.5} alignItems="center">
                <LocalShippingIcon fontSize="small" />
                <Typography variant="caption">
                  {product.shippingInformation}
                </Typography>
              </Stack>
              {!product.warrantyInformation.toLowerCase().includes("no") ? (
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <VerifiedIcon fontSize="small" />
                  <Typography variant="caption">
                    {product.warrantyInformation}
                  </Typography>
                </Stack>
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ p: 2.5, pt: 0, justifyContent: "space-between" }}>
        <Typography
          variant="caption"
          color={inStock ? "success.main" : "text.secondary"}
        >
          {inStock ? `${product.stock} in stock` : "Out of stock"}
        </Typography>
        <Button
          onClick={() => onAddToCart?.(product)}
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          disabled={!inStock}
          sx={{ borderRadius: 4, textTransform: "none", fontWeight: 700 }}
        >
          Add
        </Button>
      </CardActions>
    </MotionCard>
  );
}
