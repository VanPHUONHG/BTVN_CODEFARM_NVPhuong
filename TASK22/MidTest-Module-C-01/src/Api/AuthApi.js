import api from ".";

export const registerUser = async (userData) => {
  const { data } = await api.post("/register", userData);
  return data;
};

export const loginUser = async (userData) => {
  const { data } = await api.post("/login", userData);
  return data;
};
