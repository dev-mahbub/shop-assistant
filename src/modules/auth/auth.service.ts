import { pool } from "../../db";
import bcrypt from "bcrypt";
import type { IUsers } from "./auth.interface";

const signUpUserService = async (payload: IUsers) => {
  const { name, email, password, roll, is_active } = payload;

  //email existance check
  const isUserExists = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [email],
  );

  if (isUserExists.rows.length > 0) {
    throw new Error("Email already exists");
  }

  //password hashing
  const hashPassword = await bcrypt.hash(password, 10);

  //create user
  const result = await pool.query(
    `
    INSERT INTO users( name, email, password, roll, is_active) VALUES($1, $2, $3, COALESCE($4, 'shopowener'), COALESCE($5, false)) RETURNING*
    `,
    [name, email, hashPassword, roll, is_active],
  );
  return result;
};
export const authService = {
  signUpUserService,
};
