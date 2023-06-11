// base api calls
import { useUserStore } from "@/stores/userStore";

const req = async ({ method = "POST", uri, payload }) => {
  const token = useUserStore().store.token
  const url = `${import.meta.env.VITE_API_URL}${uri}`;
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const result = await fetch(url, {
    method, headers, body: JSON.stringify(payload)
  });
  return result.json();
};

export const login = async (user) =>
  await req({ uri: "/login", payload: user });

export const createUser = async (newUser) =>
  await req({ uri: "/signup", payload: newUser });

// TODO passar token daqui pra baixo

export const removeAccount = async ({ id, email, senha }) =>
  await req({
    method: "DELETE",
    uri: `/${id}/removeAccount?email=${email}&senha=${senha}`
  });

export const listCarteiras = async ({ id , q = "", limit = 50, offset = 0 }) =>
  await req({
    method: "GET",
    uri: `/${id}/conta?q=${q}&limit=${limit}&offset=${offset}`
  });
