import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { pool } from "../db";
import sendResponse from "../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

export type IRoles = "admin" | "shopowner";

const checkRole = (roles: IRoles) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //first get token
    //decode token
    //get user from db with decoded email or id
    //compare role
    //send decoded user to request
    const token = req.headers.authorization;

    if (!token) {
      return sendResponse(res, {
        statusCode: StatusCodes.UNAUTHORIZED,
        success: false,
        message: "Unauthorize access",
      });
    }

    //decode token
    const decoded = jwt.verify(
      token as string,
      config.secrets as string,
    ) as JwtPayload;

    //get user from db
    const { email } = decoded;

    const userData = await pool.query(
      `
        SELECT * FROM users WHERE email=$1
        `,
      [email],
    );

    if (userData.rows.length == 0) {
      return sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: "User not found",
      });
    }
    const user = userData.rows[0];
    if (roles.length && !roles.includes(user.role)) {
      return sendResponse(res, {
        statusCode: StatusCodes.FORBIDDEN,
        success: false,
        message: "Forbidden user",
      });
    }

    req.user = decoded;
    next();
  };
};

export default checkRole;
