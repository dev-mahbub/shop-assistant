import { pool } from "../../db";
import type { ISubscription } from "./subscription.interface";

const subscribeService = async (payload: ISubscription) => {
  const { payment_status, plan, price, status, expires_at, payment_method } =
    payload;

  const result = await pool.query(
    `
    INSERT INTO subscriptions(payment_status, plan, price, status, expire_at, payment_method)
    VALUES(COALESCE($1, 'unpaid'), COALESCE($2, 'basic'), COALESCE($3, 15), COALESCE($4, 'inactive'), $5, $6) RETURNING*
    `,
    [payment_status, plan, price, status, expires_at, payment_method],
  );
  return result;
};

export const subscibeService = {
  subscribeService,
};
