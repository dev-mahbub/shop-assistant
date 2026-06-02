export type IPlan = "Basic" | "Pro" | "Enterprise";

export type IPaymentStatus =
  | "Success"
  | "Failed"
  | "Unpaid"
  | "Cancelled"
  | "Incomplete"
  | "Past Due";

export type ISubscriptionStatus =
  | "Active"
  | "Inactive"
  | "Expired"
  | "Cancelled";

export interface ISubscription {
  id: string;
  user_id: string;
  plan: IPlan;
  price: number;
  status: ISubscriptionStatus;
  payment_status: IPaymentStatus;
  payment_method: string;
  started_at: Date;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}

// 1. Payment successful → payment_status: Success, status: Active, expires_at: today + 30 days → platform use করতে পারবে
// 2. Payment failed → payment_status: Failed, status: Inactive → platform use করতে পারবে না
// 3. Subscription expired → payment_status: Unpaid, status: Expired, expires_at: শেষ → widget কাজ করবে না, renew করতে বলবে
// 4. Shop Owner cancel করল → payment_status: Cancelled, status: Cancelled, expires_at: মাসের শেষ দিন → মাস শেষে বন্ধ
// 5. Payment শুরু কিন্তু complete হয়নি → payment_status: Incomplete, status: Inactive → সময় দেওয়া হবে, না করলে Failed
