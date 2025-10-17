import api from ".";

export const apiJobs = async () => {
  const { data } = await api.get("/todos");
  return data;
};

export const addJob = async (job) => {
  await api.post("/todos", job);
};

export const upDateJob = async (id, data) => {
  return await api.put(`/todos/${id}`, data);
  // return data;
};

export const apiJob = async (id) => {
  const { data } = await api.get(`/todos/${id}`);
  return data;
};
