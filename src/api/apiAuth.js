import api from ".";

export const registerAuth = async (userData) => {
  const { data } = await api.post("/register", userData);
  return data;
};

export const loginAuth = async (userData) => {
  const { data } = await api.post("/login", userData);
  return data;
};
