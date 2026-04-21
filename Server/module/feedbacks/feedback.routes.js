// server/module/feedbacks/feedback.routes.js
import { Router } from "express";
import { verifyJWT, requireAdmin } from "../../middlewares/verifyJWT.js";
import { validateFeedback } from "../../middlewares/validateInput.js";
import { validateObjectId } from "../../middlewares/validateObjectId.js";
import { feedbackLimiter } from "../../middlewares/rateLimiter.js";
import {
    getAllFeedbacks,
    getAllFeedbacksForAdmin,
    getPendingFeedbacks,
    getFeedbackById,
    getUserFeedbacks,
    createFeedback,
    approveFeedback,
    likeFeedback,
    unlikeFeedback,
    deleteFeedback,
    getFeedbackStats
} from "./feedback.controller.js";

const router = Router();

// PUBLIC ROUTES (no auth needed) - Only shows approved feedbacks (PII stripped)
router.get("/", getAllFeedbacks);
router.get("/stats", getFeedbackStats);
router.get("/:id", validateObjectId, getFeedbackById);

// PROTECTED ROUTES (need auth) + rate limiting on creation
router.get("/user/my", verifyJWT, getUserFeedbacks);
router.post("/", verifyJWT, feedbackLimiter, validateFeedback, createFeedback);
router.post("/:id/like", verifyJWT, validateObjectId, likeFeedback);
router.delete("/:id/like", verifyJWT, validateObjectId, unlikeFeedback);
router.delete("/:id", verifyJWT, validateObjectId, deleteFeedback);

// ADMIN ONLY ROUTES
router.get("/admin/all", verifyJWT, requireAdmin, getAllFeedbacksForAdmin);
router.get("/admin/pending", verifyJWT, requireAdmin, getPendingFeedbacks);
router.put("/admin/:id/approve", verifyJWT, requireAdmin, validateObjectId, approveFeedback);

export default router;