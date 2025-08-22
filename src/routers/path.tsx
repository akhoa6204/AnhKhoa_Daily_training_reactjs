// routes.tsx
import type { RouteObject } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import FavouritesPage from "../pages/FavouritesPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoute from "./Private.route";
import PublicRoute from "./Public.route";
import OriginalFormRegister from "../pages/OriginalFormRegister";

export const paths: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/original-form",
        element: <OriginalFormRegister />,
      },
      {
        element: <PrivateRoute />,
        children: [{ path: "favourites", element: <FavouritesPage /> }],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: "register", element: <RegisterPage /> },
          { path: "login", element: <LoginPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];
