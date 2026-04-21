// server/module/feedbacks/feedback.controller.js
import FeedbackModel from "./feedback.model.js";
import { ObjectId } from "mongodb";

const isProduction = process.env.NODE_ENV === 'production';

// Helper: remove PII fields from public feedback responses
const sanitizePublicFeedback = (fb) => {
    const { userEmail, userId, likedBy, ...publicFields } = fb;
    return {
        ...publicFields,
        userName: publicFields.userName || 'Anonymous User',
        userLocation: publicFields.userLocation || 'Commuter'
    };
};

// Helper: generic error response
const sendError = (res, error, fallbackMsg) => {
    console.error(fallbackMsg, error);
    if (isProduction) {
        return res.status(500).json({ message: 'An internal error occurred. Please try again later.' });
    }
    return res.status(500).json({ message: fallbackMsg + ': ' + error.message });
};

// Get all feedbacks (PUBLIC - only approved, NO PII)
export const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await FeedbackModel.findApproved();
        const formattedFeedbacks = feedbacks.map(sanitizePublicFeedback);
        res.status(200).json(formattedFeedbacks);
    } catch (error) {
        sendError(res, error, 'Error fetching feedbacks');
    }
};

// Get all feedbacks for admin (includes pending — admin can see PII)
export const getAllFeedbacksForAdmin = async (req, res) => {
    try {
        if (req.user.role !== 'super-admin') {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
        
        const feedbacks = await FeedbackModel.findAllForAdmin();
        const formattedFeedbacks = feedbacks.map(feedback => ({
            ...feedback,
            userName: feedback.userName || 'Anonymous User',
            userLocation: feedback.userLocation || 'Commuter'
        }));
        
        res.status(200).json(formattedFeedbacks);
    } catch (error) {
        sendError(res, error, 'Error fetching all feedbacks');
    }
};

// Get pending feedbacks (admin only)
export const getPendingFeedbacks = async (req, res) => {
    try {
        if (req.user.role !== 'super-admin') {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
        
        const feedbacks = await FeedbackModel.findPending();
        const formattedFeedbacks = feedbacks.map(feedback => ({
            ...feedback,
            userName: feedback.userName || 'Anonymous User',
            userLocation: feedback.userLocation || 'Commuter'
        }));
        
        res.status(200).json(formattedFeedbacks);
    } catch (error) {
        sendError(res, error, 'Error fetching pending feedbacks');
    }
};

// Approve a feedback (admin only)
export const approveFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (req.user.role !== 'super-admin') {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
        
        const result = await FeedbackModel.approveFeedback(id);
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        
        res.status(200).json({ message: "Feedback approved successfully" });
    } catch (error) {
        sendError(res, error, 'Error approving feedback');
    }
};

// Get feedback by ID (PUBLIC — NO PII)
export const getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await FeedbackModel.findById(id);
        
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        
        res.status(200).json(sanitizePublicFeedback(feedback));
    } catch (error) {
        sendError(res, error, 'Error fetching feedback by ID');
    }
};

// Get user's own feedbacks (PROTECTED — user can see their own data)
export const getUserFeedbacks = async (req, res) => {
    try {
        const userId = req.user._id;
        const feedbacks = await FeedbackModel.findByUserId(userId);
        
        const formattedFeedbacks = feedbacks.map(feedback => ({
            ...feedback,
            userName: feedback.userName || req.user.fullName || 'Anonymous User',
            userLocation: feedback.userLocation || req.user.location || 'Commuter'
        }));
        
        res.status(200).json(formattedFeedbacks);
    } catch (error) {
        sendError(res, error, 'Error fetching user feedbacks');
    }
};

// Create new feedback (PROTECTED - requires auth)
export const createFeedback = async (req, res) => {
    try {
        const { rating, comment, userLocation } = req.body;
        const user = req.user;
        
        // Input validation is now handled by validateFeedback middleware,
        // but keep defensive checks here too
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }
        
        if (!comment || comment.trim().length < 5) {
            return res.status(400).json({ message: "Comment must be at least 5 characters" });
        }
        
        const userName = user.fullName || user.name || user.username || 'Anonymous User';
        
        const feedbackData = {
            userId: user._id,
            userName: userName,
            userEmail: user.email, // Still stored in DB for admin, but NOT returned in public API
            userLocation: userLocation || user.location || 'Commuter',
            rating: parseInt(rating),
            comment: comment.trim()
        };
        
        const newFeedback = await FeedbackModel.create(feedbackData);
        
        // Remove PII from response — user can see their own email but we limit it
        const { userEmail, likedBy, ...safeFeedback } = newFeedback;
        
        res.status(201).json({ 
            message: "Thank you for your feedback! It will be reviewed by our admin team before being published.",
            feedback: safeFeedback
        });
    } catch (error) {
        sendError(res, error, 'Error creating feedback');
    }
};

// Like a feedback (PROTECTED)
export const likeFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id.toString();
        
        const result = await FeedbackModel.likeFeedback(id, userId);
        
        if (result.error) {
            return res.status(404).json({ message: result.error });
        }
        
        if (result.message === "Already liked") {
            return res.status(400).json({ message: "You already liked this feedback" });
        }
        
        res.status(200).json({ message: "Feedback liked successfully" });
    } catch (error) {
        sendError(res, error, 'Error liking feedback');
    }
};

// Unlike a feedback (PROTECTED)
export const unlikeFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id.toString();
        
        const result = await FeedbackModel.unlikeFeedback(id, userId);
        res.status(200).json({ message: "Feedback unliked successfully" });
    } catch (error) {
        sendError(res, error, 'Error unliking feedback');
    }
};

// Delete feedback (PROTECTED - only owner or admin)
export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const isAdmin = req.user.role === 'super-admin';
        
        let result;
        if (isAdmin) {
            result = await FeedbackModel.adminDeleteById(id);
        } else {
            result = await FeedbackModel.deleteById(id, userId);
        }
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Feedback not found or you don't have permission" });
        }
        
        res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        sendError(res, error, 'Error deleting feedback');
    }
};

// Get feedback statistics (PUBLIC — only aggregate data)
export const getFeedbackStats = async (req, res) => {
    try {
        const stats = await FeedbackModel.getStats();
        res.status(200).json(stats);
    } catch (error) {
        sendError(res, error, 'Error fetching feedback stats');
    }
};