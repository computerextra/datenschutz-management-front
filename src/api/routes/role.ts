import client from "../api";
import { RoleResponse } from "../types";

const url = "/role";

export const getAllRoles = async (): Promise<RoleResponse> => {
  const { data } = await client.get<RoleResponse>(url + "/all");
  return data;
};

export const getRole = async (id: string): Promise<RoleResponse> => {
  const { data } = await client.get<RoleResponse>(url + `/${id}`);
  return data;
};

export const createRole = async (name: string): Promise<RoleResponse> => {
  const { data } = await client.post<RoleResponse>(url + "/new", { name });
  return data;
};

export const updateRole = async (id: string, name: string): Promise<RoleResponse> => {
  const { data } = await client.post<RoleResponse>(url + `/${id}`, { name });
  return data;
};

export const deleteRole = async (id: string): Promise<RoleResponse> => {
  const { data } = await client.post<RoleResponse>(url + `/delete/${id}`);
  return data;
};
