import { Router } from "express";
import { subscriptoinController } from "./subscription.controller";

const router = Router();

router.post("/", subscriptoinController.createSubscribtion);

export const subscribtionRoute = router;
