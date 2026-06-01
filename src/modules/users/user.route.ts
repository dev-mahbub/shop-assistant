import { Router } from "express";
import { userController } from "./user.controller";
import checkRole from "../../middleware/auth";

const router = Router();

router.get("/", checkRole("admin"), userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", checkRole("admin"), userController.deleteUser);

export const userRoute = router;
