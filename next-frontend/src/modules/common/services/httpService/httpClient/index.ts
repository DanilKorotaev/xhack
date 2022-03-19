import axios from "axios";

export const apiHttpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
});
