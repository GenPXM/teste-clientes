import { api } from "../api/api";

export async function login(username: string, password: string) {
  const response = await api.post("/login", {
    username,
    password,
  });

  const token = response.data.access_token;

  localStorage.setItem("token", token);

  return token;
}