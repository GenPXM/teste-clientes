import { api } from '../api/api';
import type { Client } from '../types/Client';

export const getClients = async (page = 1) => {
  const response = await api.get(`/clients?page=${page}&limit=10`);
  return response.data;
};

export const createClient = async (client: Client) => {
  const { data } = await api.post('/clients', client);
  return data;
};

export const updateClient = async (id: number, client: Partial<Client>) => {
  const { data } = await api.patch(`/clients/${id}`, client);
  return data;
};