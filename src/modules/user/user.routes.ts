import { Router } from "express";
import { UserControllers } from "./user.controllers";

const router = Router();

router.post("/", UserControllers.createUser);
router.get("/", UserControllers.getAllUser);
router.get("/:id", UserControllers.getUserById);
router.patch("/:id", UserControllers.updateUserById);
router.delete("/delete", UserControllers.deleteAllUser);

export const UserRoutes = router;
