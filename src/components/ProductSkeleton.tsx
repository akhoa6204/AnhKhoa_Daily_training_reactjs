import { Box, Skeleton } from "@mui/material";
const ProductSkeleton = () => {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Skeleton variant="rectangular" height={200} animation="wave" />
      <Box sx={{ py: 2 }}>
        <Skeleton width="60%" />
        <Skeleton width="40%" />
        <Skeleton width="80%" />
      </Box>
    </Box>
  );
};
export default ProductSkeleton;
