// server/middlewares/errorHandler.js
// Centralized error handler — hides implementation details from clients in production

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Global error handler middleware.
 * In production: returns generic error messages (no stack traces, no function names).
 * In development: returns full error details for debugging.
 */
export const errorHandler = (err, req, res, next) => {
    console.error('Server Error:', err);

    if (isProduction) {
        // Generic message — no leakage of internals
        return res.status(500).json({
            message: 'An internal error occurred. Please try again later.'
        });
    }

    // Development: full details
    return res.status(500).json({
        message: err.message,
        stack: err.stack
    });
};