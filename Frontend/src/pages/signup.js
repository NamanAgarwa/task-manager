import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      const data = res.data;
      if (data.token) localStorage.setItem("token", data.token);
      login(data.user);
      router.push("/tasks");
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || "Signup failed");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} maxWidth={400} mx="auto" mt={8}>
        <Typography variant="h5">Signup</Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <span style={{ color: "red" }}>{error}</span>}
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </Button>
      </Stack>
    </form>
  );
}
