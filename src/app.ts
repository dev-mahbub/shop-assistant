import express, { type Request, type Response } from "express";
import { authRoute } from "./modules/auth/auth.route";
import { userRoute } from "./modules/users/user.route";
import { subscribtionRoute } from "./modules/subscription/subscription.route";
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Shop Assistent");
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/subscribtions", subscribtionRoute);

export default app;
