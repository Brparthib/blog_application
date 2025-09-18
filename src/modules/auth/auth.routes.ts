import { Router } from "express";
import { AuthControllers } from "./auth.controllers";

const router = Router();

router.post("/login", AuthControllers.loginWithEmailAndPassword);
router.post("/google", AuthControllers.authWithGoogle);

export const AuthRoutes = router;
