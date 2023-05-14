// base api calls
const req = async ({ method = "POST", uri, payload, token }) => {
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

export const login = async (user) => {
  return await req({ uri: "/login", payload: user });
};

export const createUser = async (newUser) => {
  return await req({ uri: "/signup", payload: newUser });
};

export const removeAccount = async ({ email, senha }) => {
  return await req({
    method: "DELETE",
    uri: `/removeAccount?email=${email}&senha=${senha}`
  });
};