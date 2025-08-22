import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { logOut } from "../redux/slice/account.slice";

type Path = {
  label: string;
  to?: string;
  end?: boolean;
  onClick?: () => void;
};

export default function Header() {
  const { isAuthenticated } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logOut());
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  const paths: Path[] = useMemo(() => {
    return isAuthenticated
      ? [
          { label: "home", to: "/", end: true },
          { label: "favourites", to: "/favourites" },
          { label: "profile", to: "/profile" },
          { label: "logout", onClick: handleLogout },
        ]
      : [
          { label: "home", to: "/", end: true },
          { label: "login", to: "/login" },
          { label: "register", to: "/register" },
        ];
  }, [isAuthenticated, handleLogout]);

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6" component="div">
            MyShop
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            {paths.map((item) =>
              item.to ? (
                <Button
                  key={item.label}
                  component={NavLink}
                  to={item.to}
                  {...(item.end ? { end: true } : {})}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    borderRadius: 0,
                    '&[aria-current="page"]': {
                      fontWeight: 700,
                      borderBottom: "2px solid white",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "uppercase" }}
                  >
                    {item.label}
                  </Typography>
                </Button>
              ) : (
                <Button
                  key={item.label}
                  onClick={item.onClick}
                  color="inherit"
                  sx={{ textTransform: "none", borderRadius: 0 }}
                >
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "uppercase" }}
                  >
                    {item.label}
                  </Typography>
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
