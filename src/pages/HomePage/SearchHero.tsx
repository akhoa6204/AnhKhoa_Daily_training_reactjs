import * as React from "react";
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

type Props = {
  search: string;
  isSearching: boolean;
  trendingKeywords: string[];
  onChangeSearch: (v: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  onPickTrending: (kw: string) => void;
};

export default function SearchHero({
  search,
  isSearching,
  trendingKeywords,
  onChangeSearch,
  onSubmit,
  onClear,
  onPickTrending,
}: Props) {
  const canSubmit = search.trim().length > 0;

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 5 },
        borderRadius: 3,
        border: (t) => `1px solid ${t.palette.divider}`,
        background:
          "linear-gradient(180deg, rgba(25,118,210,0.08), transparent 60%)",
      }}
    >
      {/* decorative faint grid */}
      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          backgroundImage:
            "linear-gradient(to right, rgba(120,120,120,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,120,120,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black, transparent 70%)",
        }}
      />

      <Stack spacing={2} alignItems="center" textAlign="center">
        <Typography variant="h4" fontWeight={800}>
          Find what you’re looking for
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 720 }}
        >
          Type a keyword to explore our catalog. Press Enter to search quickly.
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (canSubmit) onSubmit();
          }}
          sx={{ width: "100%", maxWidth: 720 }}
          noValidate
        >
          <TextField
            fullWidth
            size="medium"
            placeholder="e.g. iPhone 15, gaming laptop, skincare…"
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (canSubmit) onSubmit();
              }
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {isSearching && (
                      <IconButton
                        aria-label="Clear search"
                        onClick={onClear}
                        edge="end"
                        size="small"
                      >
                        <ClearRoundedIcon fontSize="small" />
                      </IconButton>
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ ml: 1 }}
                      disabled={!canSubmit}
                    >
                      Search
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="center"
        >
          <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
            Trending:
          </Typography>
          {trendingKeywords.map((kw) => (
            <Chip
              key={kw}
              label={kw}
              size="small"
              onClick={() => onPickTrending(kw)}
              clickable
              variant="outlined"
            />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}
