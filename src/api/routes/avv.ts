import client from "../api";
import { AVVList, AvvResponse } from "../types";

const url = "/avv";

export const getAllAvv = async (): Promise<AVVList> => {
  const { data } = await client.get<AVVList>(url);
  return data;
};

export const getAvv = async (id: string): Promise<AvvResponse> => {
  const { data } = await client.get<AvvResponse>(url + `/${id}`);
  return data;
};

export const createAvv = async (kundenname: string, kundennummer: string, vertrag: string): Promise<AvvResponse> => {
  const { data } = await client.post<AvvResponse>(url + "/new", {
    kundenname,
    kundennummer,
    vertrag,
  });
  return data;
};

export const updateAvv = async (id: string, kundenname: string, kundennummer: string, vertrag: string): Promise<AvvResponse> => {
  const { data } = await client.post<AvvResponse>(url + `/${id}`, {
    kundenname,
    kundennummer,
    vertrag,
  });
  return data;
};

export const updateAvvComment = async (id: string, comment: string): Promise<AvvResponse> => {
  const { data } = await client.post<AvvResponse>(url + `/${id}/comment`, {
    comment,
  });
  return data;
};

export const approveAvv = async (id: string): Promise<AvvResponse> => {
  const { data } = await client.post<AvvResponse>(url + `/${id}/approve`);
  return data;
};
