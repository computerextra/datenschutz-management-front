import { createEnv } from "@t3-oss/env-nextjs";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const env = createEnv({
  server: {
    API_URL: z.string().url().default("http://localhost:3001"),
    SHARED_SECRET: z.string(),
  },
  client: {},
  runtimeEnv: {
    API_URL: process.env.API_URL,
    SHARED_SECRET: process.env.SHARED_SECRET,
  },
  emptyStringAsUndefined: true,
});
