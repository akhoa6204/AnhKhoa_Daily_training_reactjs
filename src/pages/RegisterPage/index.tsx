import * as React from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  Link,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/useRedux";
import { registerSuccess } from "../../redux/slice/account.slice";
import { useNavigate } from "react-router-dom";

/** ---------- Validation schema (EN) ---------- */
const schema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
    confirmPassword: z.string(),
    phone: z
      .string()
      .optional()
      .refine(
        (v) => !v || /^[0-9+()\-.\s]{9,}$/.test(v),
        "Invalid phone number"
      ),
    agree: z
      .boolean()
      .refine((v) => v, { message: "You must agree to the terms" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof schema>;

function scorePassword(pw: string) {
  if (!pw) return { value: 0, label: "Very weak", color: "error" as const };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 12) score++;
  score = Math.min(4, Math.max(0, score - 1));
  const map = [
    { label: "Very weak", color: "error" as const },
    { label: "Weak", color: "error" as const },
    { label: "Fair", color: "warning" as const },
    { label: "Strong", color: "info" as const },
    { label: "Very strong", color: "success" as const },
  ];
  return { value: (score + 1) * 20, ...map[score] };
}

export default function RegisterPage() {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      agree: false,
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const [showPw, setShowPw] = React.useState(false);
  const [showPw2, setShowPw2] = React.useState(false);
  const pw = watch("password");
  const strength = scorePassword(pw);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    try {
      clearErrors("root.server");
      const { confirmPassword, agree, ...rest } = data;
      dispatch(registerSuccess({ ...rest }));
      navigate("/login", { replace: true });
    } catch (e: any) {
      setError("root.server", {
        type: "server",
        message: e?.message || "Sign up failed. Please try again.",
      });
    }
  };

  return (
    <Container>
      <Box sx={{ py: 2 }}>
        <FormProvider {...methods}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3 },
              borderRadius: 3,
              border: (t) => `1px solid ${t.palette.divider}`,
              background:
                "linear-gradient(180deg, rgba(25,118,210,0.06), transparent 60%)",
              maxWidth: 560,
              mx: "auto",
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PersonAddAlt1RoundedIcon />
                <Typography variant="h5" fontWeight={800}>
                  Create an account
                </Typography>
              </Stack>

              {/* Server error (if any) */}
              {"root" in errors && errors.root?.server?.message && (
                <Alert severity="error">{errors.root.server.message}</Alert>
              )}

              {isSubmitSuccessful && (
                <Alert severity="success">Signed up successfully!</Alert>
              )}

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
              >
                <Stack spacing={2}>
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Full name"
                        autoComplete="name"
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        fullWidth
                      />
                    )}
                  />

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
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="tel"
                        inputMode="tel"
                        label="Phone (optional)"
                        autoComplete="tel"
                        error={!!errors.phone}
                        helperText={
                          errors.phone?.message ?? "e.g. 0987 654 321"
                        }
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
                        autoComplete="new-password"
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

                  {/* Strength meter */}
                  <Box sx={{ px: 0.5 }}>
                    <Box
                      sx={{
                        height: 8,
                        borderRadius: 999,
                        bgcolor: "action.hover",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          height: 1,
                          width: `${strength.value}%`,
                          bgcolor: (t) => t.palette[strength.color].main,
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Strength: {strength.label}
                    </Typography>
                  </Box>

                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type={showPw2 ? "text" : "password"}
                        label="Confirm password"
                        autoComplete="new-password"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        fullWidth
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  edge="end"
                                  onClick={() => setShowPw2((v) => !v)}
                                  aria-label="Show/Hide confirm password"
                                >
                                  {showPw2 ? (
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
                    name="agree"
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormControlLabel
                          control={
                            <Checkbox {...field} checked={!!field.value} />
                          }
                          label={
                            <Typography variant="body2" color="text.secondary">
                              I agree to the{" "}
                              <Link href="#" underline="always">
                                Terms
                              </Link>{" "}
                              &{" "}
                              <Link href="#" underline="always">
                                Privacy Policy
                              </Link>
                            </Typography>
                          }
                        />
                        {errors.agree && (
                          <FormHelperText error>
                            {errors.agree.message}
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
                    sx={{ mt: 0.5 }}
                    fullWidth
                  >
                    Create account
                  </LoadingButton>
                </Stack>
              </Box>

              <Divider />

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Already have an account?{" "}
                <Link href="/login" underline="always">
                  Sign in
                </Link>
              </Typography>
            </Stack>
          </Paper>
        </FormProvider>
      </Box>
    </Container>
  );
}
