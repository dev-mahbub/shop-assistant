import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  connecting_string: process.env.CONNECTINGSTRING,
  port: process.env.PORT,
};
