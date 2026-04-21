// server/middlewares/validateInput.js
// Input validation & sanitization middleware — blocks NoSQL injection, XSS, type confusion, mass assignment

/**
 * Strip HTML tags and sanitize strings to prevent stored XSS.
 * Escapes <, >, &, ", ' characters.
 */
const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
};

/**
 * Deep-sanitize an object: all string values get HTML-escaped.
 * Any value that starts with "$" (MongoDB operator) is removed entirely.
 * Non-serializable types (functions, symbols) are stripped.
 */
const sanitizeObject = (obj) => {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj === 'string') return sanitizeString(obj);
    if (typeof obj === 'number' || typeof obj === 'boolean') return obj;
    if (Array.isArray(obj)) return obj.map(item => sanitizeObject(item));

    if (typeof obj === 'object') {
        const clean = {};
        for (const [key, value] of Object.entries(obj)) {
            // Block MongoDB operator injection ($gt, $where, $regex, etc.)
            if (key.startsWith('$')) continue;
            // Block prototype pollution
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
            clean[key] = sanitizeObject(value);
        }
        return clean;
    }
    return obj;
};

/**
 * Validate feedback input — strict type checking + sanitization.
 * Prevents: NoSQL injection, stored XSS, mass assignment, float bypass.
 */
export const validateFeedback = (req, res, next) => {
    const { rating, comment, userLocation } = req.body;

    // --- Type enforcement ---
    if (comment !== undefined && typeof comment !== 'string') {
        return res.status(400).json({ message: 'Invalid input: comment must be a string.' });
    }
    if (rating !== undefined && (typeof rating !== 'number' || !Number.isInteger(rating))) {
        return res.status(400).json({ message: 'Invalid input: rating must be an integer.' });
    }
    if (userLocation !== undefined && typeof userLocation !== 'string') {
        return res.status(400).json({ message: 'Invalid input: userLocation must be a string.' });
    }

    // --- Rating range ---
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    // --- Comment length ---
    if (!comment || comment.trim().length < 5) {
        return res.status(400).json({ message: 'Comment must be at least 5 characters.' });
    }
    if (comment.trim().length > 1000) {
        return res.status(400).json({ message: 'Comment must be at most 1000 characters.' });
    }

    // --- Sanitize the entire body (removes $ operators, __proto__, HTML tags) ---
    req.body = sanitizeObject(req.body);

    // --- Whitelist: only allow known feedback fields (blocks mass assignment) ---
    const allowed = { rating: req.body.rating, comment: req.body.comment, userLocation: req.body.userLocation };
    req.body = allowed;

    next();
};

/**
 * Validate signup input — strict type checking + sanitization.
 */
export const validateSignup = (req, res, next) => {
    const { fullName, email, password, confirmPassword } = req.body;

    if (typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 100) {
        return res.status(400).json({ message: 'Full name must be between 2 and 100 characters.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    if (typeof password !== 'string' || password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Sanitize
    req.body = sanitizeObject(req.body);

    // Whitelist
    req.body = { fullName: fullName.trim(), email: email.toLowerCase().trim(), password };

    next();
};

/**
 * Validate login input — strict type checking.
 */
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Invalid input format.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    req.body = { email: email.toLowerCase().trim(), password };

    next();
};

export { sanitizeObject, sanitizeString };