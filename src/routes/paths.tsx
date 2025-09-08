import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import ReusableUi from "../pages/ReusableUI";
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
  { path: "/reusable-ui", element: <ReusableUi /> },
  { path: "*", element: <HomePage /> },
];
export default paths;
