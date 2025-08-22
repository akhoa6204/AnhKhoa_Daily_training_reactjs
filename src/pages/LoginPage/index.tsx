import * as React from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Link,
  Button,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { LoadingButton } from "@mui/lab";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { loginSuccess } from "../../redux/slice/account.slice";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean(),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { email: "", password: "", remember: false },
  });
  const { users } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const [showPw, setShowPw] = React.useState(false);
  
  const onSubmit = async (data: FormData) => {
    try {
      clearErrors("root.server");
      const validateAccount = !!users.some(
        (user) => user.email === data.email && user.password === data.password
      );
      if (!validateAccount) throw new Error("Sign in failed. Please try again.");
      dispatch(loginSuccess({ email: data.email }));

    } catch (e: any) {
      setError("root.server", {
        type: "server",
        message: e?.message || "Sign in failed. Please try again.",
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
      <FormProvider {...methods}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 3,
            border: (t) => `1px solid ${t.palette.divider}`,
            background:
              "linear-gradient(180deg, rgba(25,118,210,0.06), transparent 60%)",
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LoginRoundedIcon />
              <Typography variant="h5" fontWeight={800}>
                Sign in
              </Typography>
            </Stack>

            {"root" in errors && errors.root?.server?.message && (
              <Alert severity="error">{errors.root.server.message}</Alert>
            )}
            {isSubmitSuccessful && (
              <Alert severity="success">Signed in successfully!</Alert>
            )}

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="on"
            >
              <Stack spacing={2}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="email"
                      label="Email"
                      autoComplete="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type={showPw ? "text" : "password"}
                      label="Password"
                      autoComplete="current-password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      fullWidth
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onClick={() => setShowPw((v) => !v)}
                                aria-label="Show/Hide password"
                              >
                                {showPw ? (
                                  <VisibilityOffOutlinedIcon />
                                ) : (
                                  <VisibilityOutlinedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />

                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <>
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={!!field.value}
                            inputProps={{ "aria-label": "Remember me" }}
                          />
                        }
                        label={
                          <Typography variant="body2" color="text.secondary">
                            Remember me
                          </Typography>
                        }
                      />
                      {errors.remember && (
                        <FormHelperText error>
                          {String(errors.remember.message)}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />

                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Sign in
                </LoadingButton>
              </Stack>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              spacing={1}
            >
              <Link href="#" underline="always" variant="body2">
                Forgot password?
              </Link>
              <Typography variant="body2" color="text.secondary">
                Don’t have an account?{" "}
                <Link href="/register" underline="always">
                  Sign up
                </Link>
              </Typography>
            </Stack>

            <Divider />

            <Stack direction="row" spacing={1}>
              <Button fullWidth variant="text" startIcon={<GoogleIcon />}>
                Google
              </Button>
              <Button fullWidth variant="text" startIcon={<FacebookIcon />}>
                Facebook
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </FormProvider>
    </Container>
  );
}
