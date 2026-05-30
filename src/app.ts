import express, { type Request, type Response } from "express";
import { authRoute } from "./modules/auth/auth.route";
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Shop Assistent");
});

app.use("/auth", authRoute);

export default app;
