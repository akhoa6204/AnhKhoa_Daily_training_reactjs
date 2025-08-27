import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";

import { useEffect, useState } from "react";
import httpClient from "../services/httpClient";
import { apiKey } from "../constant/api-key";
interface WeatherResponse {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    grnd_level?: number;
    humidity: number;
    pressure: number;
    sea_level?: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    deg: number;
    gust?: number;
    speed: number;
  };
}

const WeatherApp = () => {
  const [data, setData] = useState<WeatherResponse>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const params = {
      q: "Da Nang,vn",
      appid: apiKey,
      units: "metric",
      lang: "vi",
    };
    setLoading(true);
    httpClient
      .get("/weather", { params })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress sx={{ mb: 1 }} />
        <Typography fontWeight={700}>Đang tải dữ liệu thời tiết</Typography>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">Không lấy được dữ liệu</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ maxWidth: 400, mx: "auto", borderRadius: 3 }} elevation={3}>
        <CardContent>
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h5" fontWeight="bold">
              {data.name}
            </Typography>
            <Box
              component="img"
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="weather icon"
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h3" fontWeight="bold">
              {Math.round(data.main.temp)}°C
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {data.weather[0].description}
            </Typography>
            <Stack direction={"row"} spacing={1}>
              <WaterDropIcon color="primary" />
              <Typography>Độ ẩm: {data.main.humidity}%</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <AirIcon color="action" />
              <Typography>Gió: {data.wind.speed} m/s</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default WeatherApp;
