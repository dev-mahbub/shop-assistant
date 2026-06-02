export interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
  role: IRoles;
  is_active: boolean;
}

export type IRoles = "admin" | "shopowener";
