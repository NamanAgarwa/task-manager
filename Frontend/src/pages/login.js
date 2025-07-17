import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      const data = res.data;
      if (data.token) localStorage.setItem("token", data.token);
      login(data.user);
      router.push("/tasks");
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || "Login failed");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)",
        position: "relative",
      }}>
      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 5,
          minWidth: { xs: 320, sm: 400 },
          maxWidth: "90vw",
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.75)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}>
          <LoginIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Welcome Back
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ mb: 1, textAlign: "center" }}>
            Sign in to your account to manage your tasks efficiently.
          </Typography>
        </Box>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
          autoComplete="on">
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              autoComplete="email"
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      tabIndex={-1}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoComplete="current-password"
            />
            {error && (
              <Box
                sx={{
                  color: "error.main",
                  fontWeight: 600,
                  textAlign: "center",
                  borderRadius: 2,
                  py: 1,
                  px: 2,
                  background: "rgba(255,0,0,0.07)",
                  boxShadow: "0 2px 8px 0 rgba(255,0,0,0.05)",
                  animation: "shake 0.2s",
                  "@keyframes shake": {
                    "0%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(-4px)" },
                    "50%": { transform: "translateX(4px)" },
                    "75%": { transform: "translateX(-4px)" },
                    "100%": { transform: "translateX(0)" },
                  },
                }}
                role="alert"
                aria-live="assertive">
                {error}
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                fontWeight: 700,
                borderRadius: 3,
                py: 1.2,
                boxShadow: "0 4px 16px 0 rgba(25, 118, 210, 0.10)",
                transition: "background 0.3s, transform 0.2s",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)",
                  transform: "scale(1.03)",
                },
              }}
              endIcon={
                loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  <LoginIcon />
                )
              }>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}>
              <Link href="/signup" passHref legacyBehavior>
                <Button
                  variant="text"
                  size="small"
                  sx={{ textTransform: "none" }}>
                  New user? Sign up
                </Button>
              </Link>
              <Button
                variant="text"
                size="small"
                sx={{ textTransform: "none" }}
                disabled
                tabIndex={-1}>
                Forgot password?
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
