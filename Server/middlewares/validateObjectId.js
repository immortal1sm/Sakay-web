// server/middlewares/validateObjectId.js
// Middleware to validate MongoDB ObjectId parameters — prevents crashes and injection via :id params

import { ObjectId } from 'mongodb';

/**
 * Validates that the :id route parameter is a valid MongoDB ObjectId.
 * Prevents crashes from invalid ObjectId strings and reduces attack surface.
 */
export const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    
    if (id && !ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid resource ID format.' });
    }
    
    next();
};