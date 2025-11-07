import api from ".";

export const apiCourses = async () => {
  const { data } = await api.get("/lessons");
  return data;
};

export const Addlessons = async (addlessons) => {
  const { data } = await api.post("/lessons", addlessons);
  return data;
};
export const updatelessons = async (id, addlessons) => {
  const { data } = await api.put(`/lessons/${id}`, addlessons);
  return data;
};

export const apiLessons = async (id) => {
  const { data } = await api.get(`/lessons/${id}`);
  return data;
};
