import axios from "axios";

const API_URL = process.env.API_URL;

export const serverApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});