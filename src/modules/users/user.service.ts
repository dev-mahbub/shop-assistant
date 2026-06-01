import { pool } from "../../db";
import type { IUsers } from "./user.interface";

//get all users
const getAllUsersService = async () => {
  const result = await pool.query(`
    SELECT * FROM users
    `);

  return result;
};

//get single user
const getSingleUserService = async (id: string) => {
  const result = await pool.query(
    `
        SELECT * FROM users WHERE id=$1
        `,
    [id],
  );

  return result;
};

//update user
const updateUserService = async (id: string, payload: IUsers) => {
  const { name, email, password, roll, is_active } = payload;
  const result = await pool.query(
    `
        UPDATE users
        SET name=COALESCE($1, name), email=COALESCE($2, email), password=COALESCE($3, password), roll=COALESCE($4, 'shopowener'), is_active=COALESCE($5, false) 
        WHERE id=$6 RETURNING*
        `,
    [name, email, password, roll, is_active, id],
  );
  return result;
};

//delete user
const deleteUserService = async (id: string) => {
  const result = await pool.query(
    `
        DELETE FROM users WHERE id=$1
        `,
    [id],
  );

  return result;
};

export const userService = {
  getAllUsersService,
  getSingleUserService,
  updateUserService,
  deleteUserService,
};
