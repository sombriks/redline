// base api calls
const req = async (uri, payload) => {
  const url = `${import.meta.env.VITE_API_URL}${uri}`;
  const token = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload)
  });
  return token.json();
};
export const login = async (user) => {
  return await req("/login", user);
};