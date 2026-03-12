/* eslint-disable react-hooks/set-state-in-effect */
import { TextField, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";

interface Client {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Props {
  initialData?: Client;
  onSubmit: (data: Client) => void;
}

export default function ClientForm({ initialData, onSubmit }: Props) {
  const [client, setClient] = useState<Client>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (initialData) {
      setClient(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(client);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Nome"
        name="name"
        value={client.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Email"
        name="email"
        value={client.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Telefone"
        name="phone"
        value={client.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Endereço"
        name="address"
        value={client.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
      >
        Salvar
      </Button>
    </Box>
  );
}