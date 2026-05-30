import { pool } from "../../db";

const signUpUserService = async (payload: any) => {
  const { name, email, password, roll, is_active } = payload;

  const isUserExists = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [email],
  );

  if (isUserExists.rows.length > 0) {
    throw new Error("Email already exists");
  }
  const result = await pool.query(
    `
    INSERT INTO users( name, email, password, roll, is_active) VALUES($1, $2, $3, COALESCE($4, 'shopowener'), COALESCE($5, false)) RETURNING*
    `,
    [name, email, password, roll, is_active],
  );
  return result;
};
export const authService = {
  signUpUserService,
};
