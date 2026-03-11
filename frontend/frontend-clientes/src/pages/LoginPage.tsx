/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      await login(username, password);

      navigate("/clients");
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Usuário ou senha inválidos");
      } else {
        setError("Erro ao realizar login. Tente novamente.");
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1976d2, #42a5f5)",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 5,
          width: 380,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <TextField
          label="Usuário"
          fullWidth
          margin="normal"
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Senha"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
          disabled={!username || !password}
        >
          Entrar
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 1 }} align="center">
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
