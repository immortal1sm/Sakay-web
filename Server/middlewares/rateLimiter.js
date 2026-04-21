// server/middlewares/rateLimiter.js
// Rate limiting middleware to prevent brute-force and spam attacks

import rateLimit from 'express-rate-limit';

/**
 * General API rate limiter — 100 requests per 15 minutes per IP.
 */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { message: 'Too many requests from this IP. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Auth rate limiter — stricter: 5 login attempts per 15 minutes per IP.
 * Prevents brute-force password attacks.
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: { message: 'Too many login attempts. Please try again in 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Signup rate limiter — 3 signups per hour per IP.
 * Prevents automated account creation.
 */
export const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3,
    message: { message: 'Too many accounts created. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Feedback creation rate limiter — 3 feedback submissions per 15 minutes per IP.
 * Prevents feedback spam.
 */
export const feedbackLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3,
    message: { message: 'Too many feedback submissions. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});