import axios from "axios";

export const api = axios.create({
    headers: {
        "Content-Type": "application/json"
    },
    baseURL: "https://api-class-o1lo.onrender.com/api/v1"
})