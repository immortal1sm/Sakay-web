// server/module/auth/auth.routers.js
import { Router } from "express";
import { login, signup, logout, getStatus } from "./auth.controller.js";
import { verifyJWT, optionalAuth } from "../../middlewares/verifyJWT.js";
import { validateLogin, validateSignup } from "../../middlewares/validateInput.js";
import { authLimiter, signupLimiter } from "../../middlewares/rateLimiter.js";

const router = Router();

router.post("/sign-up", signupLimiter, validateSignup, signup);
router.post("/log-in", authLimiter, validateLogin, login);

router.post("/logout", verifyJWT, logout);
router.get("/status", optionalAuth, getStatus); // optionalAuth: works for both logged-in and anonymous

export default router;