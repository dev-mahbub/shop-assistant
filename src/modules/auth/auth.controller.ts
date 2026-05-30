import type { Request, Response } from "express";
import { authService } from "./auth.service";
import { pool } from "../../db";

const signUpUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.signUpUserService(req.body);

    res.status(201).json({
      success: true,
      message: "User registerd successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  signUpUser,
};
