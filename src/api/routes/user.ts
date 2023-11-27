import client from "../api";
import { UserResponse } from "../types";

const url = "/user";

export const getUsers = async (): Promise<UserResponse> => {
  const { data } = await client.get<UserResponse>(url + "/all");
  return data;
};

export const getUser = async (id: string): Promise<UserResponse> => {
  const { data } = await client.get<UserResponse>(url + `/${id}`);
  return data;
};

export const createUser = async (name: string, mail: string | undefined): Promise<UserResponse> => {
  const { data } = await client.post<UserResponse>(url + "/new", {
    name,
    mail,
  });
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
