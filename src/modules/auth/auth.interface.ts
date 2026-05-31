export interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
  roll: "admin" | "shopowner";
  is_active: boolean;
}
