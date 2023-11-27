import client from "../api";

const url = "/auth";

export const logIn = async (mail: string, pass: string): Promise<{ message: string }> => {
  const { data } = await client.post(url + "/signIn", {
    mail,
    password: pass,
  });
  return data;
};

export const auth = async (id: string, token: string): Promise<{ message: string }> => {
  const { data } = await client.post(url, {
    id,
    token,
  });
  return data;
};
