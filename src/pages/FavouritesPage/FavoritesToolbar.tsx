import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";

import {
  Button,
  Divider,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material";
// Note: SelectChangeEvent import from @mui/material/Select
import Select, { type SelectChangeEvent } from "@mui/material/Select";

type SortKey = "new" | "priceAsc" | "priceDesc";
type ViewMode = "grid" | "list";

type FavoritesToolbarProps = {
  query: string;
  sort: SortKey;
  view: ViewMode;
  itemsCount?: number;
  disabled?: boolean;
  onQueryChange: (value: string) => void;
  onSortChange: (value: SortKey) => void;
  onToggleView: () => void;
  onClearAll: () => void;
};

export default function FavoritesToolbar({
  query,
  sort,
  view,
  itemsCount = 0,
  disabled = false,
  onQueryChange,
  onSortChange,
  onToggleView,
  onClearAll,
}: FavoritesToolbarProps) {
  const handleSortChange = (e: SelectChangeEvent<SortKey>) => {
    onSortChange(e.target.value as SortKey);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      alignItems={{ xs: "stretch", sm: "center" }}
      justifyContent="space-between"
      sx={{
        p: 1.5,
        border: (t) => `1px solid ${t.palette.divider}`,
        borderRadius: 3,
        bgcolor: (t) =>
          t.palette.mode === "light" ? "#fff" : "background.paper",
        boxShadow: (t) => t.shadows[1],
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" flex={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search favorites…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          disabled={disabled}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", sm: "block" } }}
        />

        <Select
          size="small"
          value={sort}
          onChange={handleSortChange}
          disabled={disabled}
        >
          <MenuItem value="new">Newest</MenuItem>
          <MenuItem value="priceAsc">Price: Low to High</MenuItem>
          <MenuItem value="priceDesc">Price: High to Low</MenuItem>
        </Select>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ mt: { xs: 1, sm: 0 } }}
      >
        <Tooltip title={view === "grid" ? "Grid view" : "List view"}>
          <IconButton onClick={onToggleView} size="small" disabled={disabled}>
            {view === "grid" ? (
              <GridViewRoundedIcon />
            ) : (
              <ViewListRoundedIcon />
            )}
          </IconButton>
        </Tooltip>

        <Button
          variant="contained"
          color="error"
          onClick={onClearAll}
          disabled={disabled || itemsCount === 0}
        >
          Clear all
        </Button>
      </Stack>
    </Stack>
  );
}
