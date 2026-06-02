import { pool } from "../../db";
import type { ISubscription } from "./subscription.interface";

const subscribeService = async (payload: ISubscription) => {
  console.log(payload);
  const result = await pool.query(``);
};

export const subscibeService = {
  subscribeService,
};
