import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const signUpUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.signUpUserService(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "User registerd successfully",
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

//user login
const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserService(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User login successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  signUpUser,
  loginUser,
};
