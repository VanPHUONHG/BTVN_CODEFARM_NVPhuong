import api from "./index";

export const registerAuth = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

export const loginAuth = async (userData) => {
  const { data } = await api.post("/auth/login", userData);
  return data;
};
