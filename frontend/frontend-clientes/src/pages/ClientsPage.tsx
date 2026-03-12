/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { getClients } from "../services/clientService";
import { useNavigate } from "react-router-dom";
import type { Client } from "../types/Client";
import { Pagination } from "@mui/material";

import {
  Typography,
  Button,
  Box,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import ClientTable from "../components/ClientTable";
import ClientEditForm from "../components/ClientEditForm";
import { generatePDF } from "../utils/pdfGenerator";
import { api } from "../api/api";

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const navigate = useNavigate();

  const loadClients = async (currentPage = 1) => {
    const response = await getClients(currentPage);

    setClients(response.data);
    setPage(response.page);
    setLastPage(response.lastPage);
  };
  useEffect(() => {
    loadClients(1);
  }, []);

  const handleEdit = (id: number) => {
    const client = clients.find((c) => c.id === id);
    if (client) {
      setSelectedClient(client);
      setOpen(true);
    }
  };

  const handleSubmit = async (data: Client) => {
    if (selectedClient) {
      const { id, ...updateData } = data;

      await api.patch(`/clients/${selectedClient.id}`, updateData);

      setOpen(false);
      setSelectedClient(null);
      loadClients();
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 900,
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" fontWeight="bold">
            Clientes
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/clients/new")}
            >
              Novo Cliente
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={() => generatePDF(clients)}
            >
              Gerar PDF
            </Button>

            <Button variant="outlined" color="error" onClick={logout}>
              Sair
            </Button>
          </Stack>
        </Stack>

        <ClientTable clients={clients} onEdit={handleEdit} />
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            count={lastPage}
            page={page}
            color="primary"
            onChange={(_, value) => {
              loadClients(value);
            }}
          />
        </Box>
      </Paper>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle fontWeight="bold">Editar Cliente</DialogTitle>

        <DialogContent dividers>
          {selectedClient && (
            <ClientEditForm
              initialData={selectedClient}
              onSubmit={handleSubmit} 
            />
          )}
        </DialogContent>

        <DialogActions sx={{ padding: 2 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setOpen(false);
              setSelectedClient(null);
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const form = document.querySelector("form");
              form?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true }),
              );
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
