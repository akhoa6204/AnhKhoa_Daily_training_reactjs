import * as React from "react";
import { Button, Stack } from "@mui/material";

export default function SeeMoreBar({
  visible,
  onClick,
}: {
  visible: boolean;
  onClick: () => void;
}) {
  if (!visible) return null;
  return (
    <Stack direction="row" justifyContent="center">
      <Button variant="contained" onClick={onClick}>
        See more
      </Button>
    </Stack>
  );
}
