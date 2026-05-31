import { pool } from "../../db";
import type { ISubscribe } from "./subscription.interface";

const subscribeService = async (payload: ISubscribe) => {
  const result = await pool.query(``);
};

export const subscibeService = {
  subscribeService,
};
