import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const client = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3001",
});

export default client;
