import axios from "axios";
import { env } from "./env";

const client = axios.create({
  baseURL: env.API_URL,
});

export default client;
