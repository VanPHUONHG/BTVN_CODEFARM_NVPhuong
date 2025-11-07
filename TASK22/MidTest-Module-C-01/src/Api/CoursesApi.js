import api from ".";

export const apiCourses = async () => {
  const { data } = await api.get("/courses");
  return data;
};

export const AddCourses = async (addCourses) => {
  const { data } = await api.post("/courses", addCourses);
  return data;
};
export const updateCourses = async (id, addCourses) => {
  const { data } = await api.put(`/courses/${id}`, addCourses);
  return data;
};

export const apiCourse = async (id) => {
  const { data } = await api.get(`/courses/${id}`);
  return data;
};
