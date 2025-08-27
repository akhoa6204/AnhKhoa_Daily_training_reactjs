import WeatherApp from "../pages/WeatherApp";

const paths = [
  { path: "weather-app", element: <WeatherApp /> },
  { path: "*", element: <WeatherApp /> },
];
export default paths;
