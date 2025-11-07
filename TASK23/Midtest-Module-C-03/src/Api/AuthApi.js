import api from ".";

export const RegisterApi = async (useData) => {
  const { data } = await api.post("/register", useData);
  return data;
};

export const LoginApi = async (useData) => {
  const { data } = await api.post("/login", useData);
  return data;
};
