import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  runtimeEnv: {
    API_URL: import.meta.env.VITE_API_URL,
    SHARED_SECRET: import.meta.env.VITE_SHARED_SECRET,
  },
  emptyStringAsUndefined: true,
});
