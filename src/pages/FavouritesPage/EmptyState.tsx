import { Box, Button, Stack, Typography } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

export function EmptyState() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{
        py: 8,
        borderRadius: 3,
        border: (t) => `1px dashed ${t.palette.divider}`,
        bgcolor: (t) =>
          t.palette.mode === "light" ? "#fff" : "background.paper",
      }}
    >
      <Box
        sx={{
          width: 84,
          height: 84,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          border: (t) => `2px solid ${t.palette.divider}`,
        }}
      >
        <FavoriteBorderRoundedIcon fontSize="large" />
      </Box>
      <Stack spacing={0.5} textAlign="center">
        <Typography variant="h6" fontWeight={800}>
          Chưa có sản phẩm yêu thích
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hãy khám phá và thêm sản phẩm bạn thích để lưu tại đây.
        </Typography>
      </Stack>
      <Button variant="contained" href="/">
        Khám phá sản phẩm
      </Button>
    </Stack>
  );
}
