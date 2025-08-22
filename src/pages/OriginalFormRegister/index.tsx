import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}
interface IResultValidate {
  status: boolean;
  type?: string;
  message?: string;
}
const defaultForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

const formGroups = [
  {
    name: "fullName",
    type: "text",
    label: "Họ và tên",
    autoComplete: "name",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    autoComplete: "email",
  },
  {
    name: "password",
    type: "password",
    label: "Mật khẩu",
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Xác nhận mật khẩu",
    autoComplete: "new-password",
  },
];
// - Ít nhất 8 ký tự
// - Có ít nhất 1 chữ thường
// - Có ít nhất 1 chữ hoa
// - Có ít nhất 1 chữ số
// - Có ít nhất 1 ký tự đặc biệt
const isValidPassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W){8,}$/;
  return regex.test(password);
};

const validateForm = (formData: FormData): IResultValidate => {
  if (!isValidPassword(formData.password)) {
    return {
      status: false,
      type: "password",
      message:
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ thường, 1 chữ viết hoa, 1 chữ số và 1 ký tự đặc biệt.",
    };
  }

  if (formData.password !== formData.confirmPassword) {
    return {
      status: false,
      type: "confirmPassword",
      message: "Mật khẩu xác nhận không khớp",
    };
  }

  return { status: true };
};

const OriginalFormRegister = () => {
  const [formData, setFormData] = useState<FormData>(defaultForm);
  const handleChangeForm = (key: string, value: string | boolean) => {
    setFormData((pre) => ({ ...pre, [key]: value }));
  };
  const [result, setResult] = useState<IResultValidate>({ status: true });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    const result = validateForm(formData);
    setResult(result);
  };
  return (
    <Container>
      <Box sx={{ py: 2 }}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              fontWeight={700}
              mb={2}
              textAlign={"center"}
            >
              Đăng ký tài khoản
            </Typography>
            {formGroups.map((group) => (
              <TextField
                key={group.name}
                name={group.name}
                type={group.type}
                label={group.label}
                autoComplete={group.autoComplete}
                onChange={(e) =>
                  handleChangeForm(e.target.name, e.target.value)
                }
                sx={{ mb: 2 }}
                fullWidth
                required
                error={
                  !result.status && result.type === group.name ? true : false
                }
                helperText={
                  !result.status && result.type === group.name
                    ? result.message
                    : ""
                }
              />
            ))}
            <FormControlLabel
              label={"Đồng ý với các điều khoản"}
              control={
                <Checkbox
                  checked={formData.agree}
                  name="agree"
                  onChange={(e) =>
                    handleChangeForm(e.target.name, e.target.checked)
                  }
                  required
                />
              }
              sx={{ mb: 2, width: "100%" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 2 }}
            >
              Đăng kí
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default OriginalFormRegister;
