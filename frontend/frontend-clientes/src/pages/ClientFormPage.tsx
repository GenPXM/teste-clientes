import { Typography, Box, Paper, Button, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClientForm from "../components/ClientForm";
import { api } from "../api/api";
import type { Client } from "../types/Client";

export default function ClientFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState<Client | undefined>(undefined);

  useEffect(() => {
    if (id) {
      api.get(`/clients/${id}`).then((res) => setClient(res.data));
    }
  }, [id]);

  const handleSubmit = async (data: Omit<Client, "id">) => {
    if (id) {
      await api.patch(`/clients/${id}`, data);
    } else {
      await api.post("/clients", data);
    }

    navigate("/clients");
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 500,
          padding: { xs: 2, md: 4 },
          borderRadius: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
          <Button
            variant="outlined"
            onClick={() => navigate("/clients")}
          >
            Voltar
          </Button>

          <Typography variant="h4" fontWeight="bold">
            {id ? "Editar Cliente" : "Cadastrar Cliente"}
          </Typography>
        </Stack>

        <ClientForm initialData={client} onSubmit={handleSubmit} />
      </Paper>
    </Box>
  );
}