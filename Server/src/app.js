// server/src/app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import authRoutes from '../module/auth/auth.routers.js';
import userRoutes from '../module/users/user.routes.js';
import feedbackRoutes from '../module/feedbacks/feedback.routes.js';
import announcementRoutes from '../module/announcements/announcement.routes.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';
import { errorHandler } from '../middlewares/errorHandler.js';

const app = express();

// Trust proxy (nginx) for accurate client IP in rate limiting
app.set('trust proxy', 1);

// === SECURITY HEADERS ===
app.use(helmet()); // Sets X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, etc.
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://sakay.online"],
        frameAncestors: ["'none'"],
    }
}));
app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));
app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
}));

// === CORS ===
app.use(cors({
    origin: ['http://localhost:5173', 'https://sakay.online'],
    credentials: true
}));

// === BODY PARSING ===
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent oversized payloads
app.use(cookieParser());

// === RATE LIMITING ===
app.use('/api/', apiLimiter); // General rate limit on all API routes

// === ROUTES ===
app.get('/', (req, res) => {
    res.send('SakayNE API is running...');
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/announcements', announcementRoutes);

// === GLOBAL ERROR HANDLER ===
// This must be last — catches all unhandled errors
app.use(errorHandler);

export default app;