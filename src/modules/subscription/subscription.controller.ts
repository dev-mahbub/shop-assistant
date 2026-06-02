import type { Request, Response } from "express";
import { subscibeService } from "./subscription.service";

const createSubscribtion = async (req: Request, res: Response) => {
  const result = subscibeService.subscribeService(req.body);
};

export const subscriptoinController = {
  createSubscribtion,
};
