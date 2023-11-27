export interface MessageResponse {
  message: string;
}
export interface ErrorResponse extends MessageResponse {
  stack?: string;
}

type AVV = {
  id: string;
  kundennummer: string;
  kundenname: string;
  freigegeben: boolean;
  angelegt_am: Date;
  freigegeben_am: Date | null;
  vertrag: string;
  kommentar: string | null;
};
type Role = {
  id: string;
  name: string;
};
type User = {
  id: string;
  name: string | null;
  mail: string | null;
  password: string | null;
  roleId: string;
  token: string;
};

type AVVList = {
  id: string;
  kundennummer: string;
  kundenname: string;
  kommentar: string | null;
  freigegeben: boolean;
};

export interface AvvResponse extends MessageResponse {
  avv: AVV[] | AVV | null;
}

export interface RoleResponse extends MessageResponse {
  role: Role | Role[] | null;
}

export interface UserResponse extends MessageResponse {
  user: User | User[] | null;
}

export interface AvvListResponse extends MessageResponse {
  avv: AVVList[] | null;
}
