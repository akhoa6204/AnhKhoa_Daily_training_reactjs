import { Grid } from "@mui/material";
import ProductSkeleton from "../../components/ProductSkeleton";

export default function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ProductSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}
