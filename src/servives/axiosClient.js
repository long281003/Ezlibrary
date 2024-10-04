import axios from "axios";
export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const axiosMember = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_MB
})

    