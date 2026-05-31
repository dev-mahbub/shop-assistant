import type { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

//get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersService();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Users retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

//get single users
const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getSingleUserService(id as string);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User retrived successfully",
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

export const userController = {
  getAllUsers,
  getSingleUser,
};
