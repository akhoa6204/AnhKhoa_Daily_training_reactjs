import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const paths = [
  // { path: "weather-app", element: <WeatherApp /> },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
    ],
  },
  { path: "*", element: <HomePage /> },
];
export default paths;
