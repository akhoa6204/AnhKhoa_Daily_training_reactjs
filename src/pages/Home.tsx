import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login", { replace: true });
  };
  return (
    <Container>
      <Typography variant="h5" textAlign={"center"} mb={2}>
        Trang chủ
      </Typography>
      <Button onClick={handleLogOut} variant="contained">
        Đăng xuất
      </Button>
    </Container>
  );
};
export default HomePage;
