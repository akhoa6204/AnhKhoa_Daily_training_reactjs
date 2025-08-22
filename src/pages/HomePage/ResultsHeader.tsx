import { Button, Stack, Typography } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

type Props = {
  visible: boolean;
  resultsText: string;
  onClearSearch: () => void;
};

export default function ResultsHeader({
  visible,
  resultsText,
  onClearSearch,
}: Props) {
  if (!visible) return null;

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      justifyContent="space-between"
      spacing={1.5}
      sx={{ mt: 3, mb: 1 }}
    >
      <Typography variant="subtitle1" fontWeight={700}>
        {resultsText}
      </Typography>
      <Button
        variant="text"
        color="error"
        startIcon={<ClearRoundedIcon />}
        onClick={onClearSearch}
      >
        Clear keyword
      </Button>
    </Stack>
  );
}
