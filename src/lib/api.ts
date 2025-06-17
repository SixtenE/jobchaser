import axios from "redaxios";

export const api = axios.create({
  baseURL: "https://jobchaser-api-production.up.railway.app",
});
