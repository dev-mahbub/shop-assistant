export interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
  roll: IRolls;
  is_active: boolean;
}

export type IRolls = "admin" | "shopowener";
