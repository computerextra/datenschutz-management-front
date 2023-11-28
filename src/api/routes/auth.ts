import { v5 } from "uuid";
import client from "../api";
import { User } from "../types";

const url = "/auth";

export const logIn = async (mail: string, pass: string): Promise<string | User | undefined> => {
  const password = v5(pass, import.meta.env.VITE_SHARED_SECRET);

  const { data } = await client.post<{ message?: string; user?: User }>(url + "/signIn", {
    mail,
    password,
  });
  if (data.message && (data.message === "No User Found" || data.message.startsWith("ERROR:"))) {
    return data.message;
  } else {
    return data.user;
  }
};

export const auth = async (id: string, token: string): Promise<boolean> => {
  const { data } = await client.post<{ message: string }>(url, {
    id,
    token,
  });
  if (data.message === "Auth") {
    return true;
  } else {
    return false;
  }
};
