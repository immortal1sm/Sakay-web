// server/module/drivers/driver.routes.js
import { Router } from "express";
import {
    applyDriver, getMyDriverStatus,
    getAllDrivers, getDriversByStatus,
    approveDriver, rejectDriver,
    getDriverStats, deleteDriver
} from "./driver.controller.js";
import { verifyJWT, optionalAuth } from "../../middlewares/verifyJWT.js";

const router = Router();

// Public routes
router.post("/apply", optionalAuth, applyDriver);

// User routes (logged in)
router.get("/my-status", verifyJWT, getMyDriverStatus);

// Admin routes
router.get("/all", verifyJWT, getAllDrivers);
router.get("/stats", verifyJWT, getDriverStats);
router.get("/status/:status", verifyJWT, getDriversByStatus);
router.put("/:id/approve", verifyJWT, approveDriver);
router.put("/:id/reject", verifyJWT, rejectDriver);
router.delete("/:id", verifyJWT, deleteDriver);

export default router;
