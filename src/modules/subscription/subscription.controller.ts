import type { Request, Response } from "express";
import { subscibeService } from "./subscription.service";

const subscibe = async (req: Request, res: Response) => {
  const result = subscibeService.subscribeService(req.body);
};
