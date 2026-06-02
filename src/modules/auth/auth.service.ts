import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import type { StringValue } from "ms";
import type { IUsers } from "../users/user.interface";

//user register
const signUpUserService = async (payload: IUsers) => {
  const { name, email, password, role, is_active } = payload;

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
    INSERT INTO users( name, email, password, role, is_active) VALUES($1, $2, $3, COALESCE($4, 'shopowener'), COALESCE($5, false)) RETURNING*
    `,
    [name, email, hashPassword, role, is_active],
  );
  delete result.rows[0].password;
  return result;
};

//user login
const loginUserService = async (payload: IUsers) => {
  //find user with email
  //compare password
  //create json token
  const { email, password } = payload;

  //find user
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  if (!userData.rows[0]) {
    throw new Error("Invalid Credential!");
  }

  const hashPassword = userData.rows[0].password;

  //compare password
  const comparePassword = await bcrypt.compare(password, hashPassword);

  if (!comparePassword) {
    throw new Error("User Does not exists");
  }
  const user = userData.rows[0];

  //create json token
  const jsonPaylaod = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jsonPaylaod, config.secrets as string, {
    expiresIn: config.token_expire as StringValue,
  });
  delete user.password;
  return { token, user };
};

export const authService = {
  signUpUserService,
  loginUserService,
};
