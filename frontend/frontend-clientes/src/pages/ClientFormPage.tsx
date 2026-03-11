import { Container, Typography } from "@mui/material";
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

  const handleSubmit = async (data: Omit<Client, 'id'>) => {
    if (id) {
      await api.patch(`/clients/${id}`, data);
    } else {
      await api.post("/clients", data);
    }

    navigate("/clients");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {id ? "Editar Cliente" : "Cadastrar Cliente"}
      </Typography>

      <ClientForm
        initialData={client}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}