import { Router } from "express";
import { AuthControllers } from "./auth.controllers";

const router = Router();

router.post("/login", AuthControllers.loginWithEmailAndPassword);

export const AuthRoutes = router;
