import {
  Alert,
  autocompleteClasses,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useState } from "react";
interface FormData {
  email: string;
  password: string;
}
interface Field {
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
}
const fields: Field[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "current-password",
  },
];
const defaultFormData = { email: "", password: "" };
type FieldName = keyof FormData;
type Errors = Partial<FormData>;

const validateFormData = (formData: FormData) => {
  const errors: Errors = {};
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!regexEmail.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (!regexPassword.test(formData.password)) {
    errors.password =
      "Password must be ≥ 8, có chữ hoa, thường, số, ký tự đặc biệt";
  }

  return errors;
};
const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<Errors>();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const results: Errors = validateFormData(formData);
    if (Object.keys(results).length) {
      setErrors(results);
      return;
    }

    localStorage.setItem("isAuthenticated", "true");
    navigate("/home", { replace: true });
  };
  const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: (t) => `1px solid ${t.palette.divider}`,
          background:
            "linear-gradient(180deg, rgba(25,118,210,0.06), transparent 60%)",
        }}
      >
        <Stack direction={"row"} spacing={1} sx={{ mb: 2 }}>
          <LoginRoundedIcon />
          <Typography variant="h5" textAlign={"center"} mb={2} fontWeight={700}>
            Sign in
          </Typography>
        </Stack>
        {Object.keys(errors ?? {}).length > 0 ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            Invalid email or password. Please try again.
          </Alert>
        ) : (
          ""
        )}
        <Box component={"form"} onSubmit={handleSubmit}>
          <Stack spacing={2} mb={1}>
            {fields.map((item, index) => (
              <TextField
                key={index}
                name={item.name}
                type={item.type}
                label={item.label}
                autoComplete={item.autoComplete ? item.autoComplete : undefined}
                fullWidth
                sx={{ mb: 2 }}
                onChange={handleChangeFormData}
                value={formData[item.name as FieldName]}
              />
            ))}
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Link to="">
              <Typography color="primary" variant="body2">
                Forgot password
              </Typography>
            </Link>
            <Link to="">
              <Typography color="primary" variant="body2">
                Sign up
              </Typography>
            </Link>
          </Stack>
          <Stack alignItems={"center"}>
            <Button type="submit" variant="contained">
              Đăng nhập
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};
export default LoginPage;
