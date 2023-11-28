import { v5 } from "uuid";
import client from "../api";
import { GetUserResponse, UserResponse } from "../types";

const url = "/user";

export const getUsers = async (): Promise<UserResponse> => {
  const { data } = await client.get<UserResponse>(url + "/all");
  return data;
};

export const getUser = async (id: string): Promise<GetUserResponse> => {
  const { data } = await client.get<GetUserResponse>(url + `/${id}`);
  return data;
};

export const createUser = async (name: string, mail: string | undefined, password: string): Promise<GetUserResponse> => {
  const pass = v5(password, import.meta.env.VITE_SHARED_SECRET);
  const { data } = await client.post<GetUserResponse>(url + "/new", {
    name,
    mail,
    password: pass,
  });
  console.log(data);
  return data;
};

export const updateUser = async (id: string, name: string, mail: string | undefined): Promise<UserResponse> => {
  const { data } = await client.post<UserResponse>(url + `/${id}`, {
    name,
    mail,
  });
  return data;
};

export const updateUserRole = async (id: string, roleId: string): Promise<UserResponse> => {
  const { data } = await client.post<UserResponse>(url + `/role/${id}`, {
    roleId,
  });
  return data;
};

export const deleteUser = async (id: string): Promise<UserResponse> => {
  const { data } = await client.post<UserResponse>(url + `/delete/${id}`);
  return data;
};
