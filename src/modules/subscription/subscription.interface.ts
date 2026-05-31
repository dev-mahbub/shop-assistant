export interface ISubscribe {
  id: number;
  user_id: number;
  payment_status: string;
  plan: string;
  price: number;
  status: string;
  started_at: Date;
  expire_at: Date;
  payment_mathod: string;
}
