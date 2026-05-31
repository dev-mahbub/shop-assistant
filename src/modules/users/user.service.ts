import { pool } from "../../db";

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

export const userService = {
  getAllUsersService,
  getSingleUserService,
};
