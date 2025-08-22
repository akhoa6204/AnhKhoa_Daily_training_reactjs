import { motion } from "framer-motion";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Button,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

export type NotFoundPageProps = {
  title?: string;
  message?: string;
  homeHref?: string;
  supportHref?: string;
};

export default function NotFoundPage({
  title = "Page not found",
  message = "It looks like you’ve wandered into empty space.",
  homeHref = "/",
  supportHref,
}: NotFoundPageProps) {
  const theme = useTheme();

  return (
    <Container>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative backdrop */}
        <Box
          sx={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(60% 40% at 50% -10%, ${theme.palette.primary.main}22, transparent 65%)`,
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 320,
              height: 320,
              transform: "translate(-50%, -50%)",
              borderRadius: "9999px",
              filter: "blur(32px)",
              background: `radial-gradient(circle, ${theme.palette.primary.main}26, transparent)`,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              maskImage:
                "radial-gradient(circle at center, black, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black, transparent 70%)",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                backgroundImage:
                  "linear-gradient(to right, rgba(120,120,120,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,120,120,0.06) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
          </Box>
        </Box>

        <Container
          maxWidth="md"
          sx={{ position: "relative", zIndex: 1, py: { xs: 8, md: 12 } }}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            minHeight="80vh"
            spacing={3}
            textAlign="center"
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                alignSelf: "center",
                px: 1.5,
                py: 0.5,
                borderRadius: 999,
                border: "1px solid",
                borderColor: "divider",
                opacity: 0.9,
              }}
            >
              <WarningAmberIcon fontSize="small" />
              <Typography variant="caption">404 • Not Found</Typography>
            </Stack>

            <Typography
              variant="h1"
              fontWeight={800}
              sx={{ fontSize: { xs: 72, sm: 96 } }}
            >
              404
            </Typography>

            <Typography variant="h5" sx={{ maxWidth: 560 }}>
              {title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 560 }}
            >
              {message}
            </Typography>

            {/* Actions */}
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                component={MuiLink}
                href={homeHref}
                underline="none"
                aria-label="Go to homepage"
              >
                Go to homepage
              </Button>

              {supportHref && (
                <Button
                  variant="outlined"
                  component={MuiLink}
                  href={supportHref}
                  underline="none"
                >
                  Contact support
                </Button>
              )}
            </Stack>

            <Typography variant="caption" color="text.secondary">
              Error code:{" "}
              <Box component="span" sx={{ fontFamily: "monospace" }}>
                404_NOT_FOUND
              </Box>
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Container>
  );
}
