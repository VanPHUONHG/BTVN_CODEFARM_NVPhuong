import axios from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "https://api-class-o1lo.onrender.com/api/v1",
});

export default api;
