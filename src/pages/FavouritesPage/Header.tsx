import { Chip, Stack, Typography } from "@mui/material";

export function Header({ favouritesCount }: { favouritesCount: number }) {
  return (
    <Stack
      spacing={1}
      alignItems="center"
      textAlign="center"
      direction="row"
      justifyContent="center"
    >
      <Typography variant="h4" fontWeight={800}>
        Favorite Products
      </Typography>
      <Chip
        label={`${favouritesCount} items`}
        variant="outlined"
        color="primary"
        sx={{ fontWeight: 700 }}
      />
    </Stack>
  );
}
