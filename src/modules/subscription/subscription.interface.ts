export interface ISubscribe {
  id: number;
  user_id: number;
  payment_status: IPaymentStatus;
  plan: ISubscriptionPlan;
  price: number;
  status: ISubscriptionStatus;
  started_at: Date;
  expire_at: Date;
  payment_mathod: string;
}

export type IPaymentStatus = "Success" | "Failed" | "Unpaid";

export type ISubscriptionPlan = "Basic" | "Pro" | "Enterprise";

export type ISubscriptionStatus = "Active" | "Expired" | "Cancelled" | "Paused";
