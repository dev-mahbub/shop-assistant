import type { Request, Response } from "express";
import { subscibeService } from "./subscription.service";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";

const createSubscribtion = async (req: Request, res: Response) => {
  try {
    const result = await subscibeService.subscribeService(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Subscription created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

export const subscriptoinController = {
  createSubscribtion,
};
