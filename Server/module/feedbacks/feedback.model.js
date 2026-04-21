// server/module/feedbacks/feedback.model.js
import connectDB from "../../config/db.js";
import { ObjectId } from "mongodb";

class FeedbackModel {
    static #collection = "feedbacks";

    // Projection that excludes sensitive PII from query results
    static #publicProjection = {
        projection: {
            userEmail: 0,
            likedBy: 0
        }
    };

    // Create new feedback (pending approval)
    static async create(feedbackData) {
        const db = await connectDB();

        const newFeedback = {
            userId: new ObjectId(feedbackData.userId),
            userName: feedbackData.userName || 'Anonymous User',
            userEmail: feedbackData.userEmail,
            userLocation: feedbackData.userLocation || 'Commuter',
            rating: parseInt(feedbackData.rating),
            comment: feedbackData.comment,
            likes: 0,
            likedBy: [],
            isApproved: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection(this.#collection).insertOne(newFeedback);
        return { ...newFeedback, _id: result.insertedId };
    }

    // Get all feedbacks for admin (includes pending — admin sees everything)
    static async findAllForAdmin() {
        const db = await connectDB();
        const feedbacks = await db.collection(this.#collection)
            .find()
            .sort({ createdAt: -1 })
            .toArray();

        return feedbacks.map(fb => ({
            ...fb,
            userName: fb.userName || 'Anonymous User',
            userLocation: fb.userLocation || 'Commuter'
        }));
    }

    // Get only approved feedbacks for public (PII excluded via projection)
    static async findApproved() {
        const db = await connectDB();
        const feedbacks = await db.collection(this.#collection)
            .find({ isApproved: true }, this.#publicProjection)
            .sort({ createdAt: -1 })
            .toArray();

        return feedbacks.map(fb => ({
            ...fb,
            userName: fb.userName || 'Anonymous User',
            userLocation: fb.userLocation || 'Commuter'
        }));
    }

    // Get all feedbacks (public - only approved)
    static async findAll() {
        return await this.findApproved();
    }

    // Get feedback by ID (public — PII excluded via projection)
    static async findById(id) {
        const db = await connectDB();
        const feedback = await db.collection(this.#collection).findOne(
            { _id: new ObjectId(id), isApproved: true },
            this.#publicProjection
        );

        if (feedback) {
            feedback.userName = feedback.userName || 'Anonymous User';
            feedback.userLocation = feedback.userLocation || 'Commuter';
        }

        return feedback;
    }

    // Get feedbacks by user (user sees their own data)
    static async findByUserId(userId) {
        const db = await connectDB();
        const feedbacks = await db.collection(this.#collection)
            .find({ userId: new ObjectId(userId) }, this.#publicProjection)
            .sort({ createdAt: -1 })
            .toArray();

        return feedbacks.map(fb => ({
            ...fb,
            userName: fb.userName || 'Anonymous User',
            userLocation: fb.userLocation || 'Commuter'
        }));
    }

    // Get pending feedbacks (for admin)
    static async findPending() {
        const db = await connectDB();
        const feedbacks = await db.collection(this.#collection)
            .find({ isApproved: false })
            .sort({ createdAt: -1 })
            .toArray();

        return feedbacks.map(fb => ({
            ...fb,
            userName: fb.userName || 'Anonymous User',
            userLocation: fb.userLocation || 'Commuter'
        }));
    }

    // Approve a feedback (admin)
    static async approveFeedback(feedbackId) {
        const db = await connectDB();
        return await db.collection(this.#collection).updateOne(
            { _id: new ObjectId(feedbackId) },
            { 
                $set: { 
                    isApproved: true, 
                    updatedAt: new Date() 
                } 
            }
        );
    }

    // Like a feedback
    static async likeFeedback(feedbackId, userId) {
        const db = await connectDB();

        const feedback = await db.collection(this.#collection).findOne(
            { _id: new ObjectId(feedbackId) },
            { projection: { likedBy: 1 } }
        );
        if (!feedback) {
            return { error: "Feedback not found" };
        }

        if (feedback.likedBy && feedback.likedBy.includes(userId)) {
            return { message: "Already liked" };
        }

        const result = await db.collection(this.#collection).updateOne(
            { _id: new ObjectId(feedbackId) },
            {
                $inc: { likes: 1 },
                $push: { likedBy: userId },
                $set: { updatedAt: new Date() }
            }
        );

        return result;
    }

    // Unlike a feedback
    static async unlikeFeedback(feedbackId, userId) {
        const db = await connectDB();

        const result = await db.collection(this.#collection).updateOne(
            { _id: new ObjectId(feedbackId) },
            {
                $inc: { likes: -1 },
                $pull: { likedBy: userId },
                $set: { updatedAt: new Date() }
            }
        );

        return result;
    }

    // Delete feedback
    static async deleteById(id, userId) {
        const db = await connectDB();
        return await db.collection(this.#collection).deleteOne({
            _id: new ObjectId(id),
            userId: new ObjectId(userId)
        });
    }

    // Admin delete any feedback
    static async adminDeleteById(id) {
        const db = await connectDB();
        return await db.collection(this.#collection).deleteOne({
            _id: new ObjectId(id)
        });
    }

    // Get statistics (only approved — no PII)
    static async getStats() {
        const db = await connectDB();
        const feedbacks = await db.collection(this.#collection)
            .find({ isApproved: true }, { projection: { rating: 1, likes: 1 } })
            .toArray();

        const totalFeedbacks = feedbacks.length;
        const averageRating = totalFeedbacks > 0
            ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalFeedbacks).toFixed(1)
            : 0;
        const satisfiedCount = feedbacks.filter(f => f.rating >= 4).length;
        const satisfiedPercentage = totalFeedbacks > 0
            ? Math.round((satisfiedCount / totalFeedbacks) * 100)
            : 0;

        return {
            totalFeedbacks,
            averageRating,
            satisfiedPercentage,
            totalLikes: feedbacks.reduce((acc, curr) => acc + (curr.likes || 0), 0)
        };
    }
}

export default FeedbackModel;