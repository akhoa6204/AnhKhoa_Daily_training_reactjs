import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    navigate("/home", { replace: true });
  };
  return (
    <Container>
      <Typography variant="h5" textAlign={"center"} mb={2}>
        Trang đăng nhập
      </Typography>
      <Button onClick={handleLogin} variant="contained">
        Đăng nhập
      </Button>
    </Container>
  );
};
export default LoginPage;
