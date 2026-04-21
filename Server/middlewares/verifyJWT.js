// server/middlewares/verifyJWT.js
import jwt from "jsonwebtoken";
import User from "../module/users/user.model.js";
import Roles from "../constant/roles.js";

/**
 * STRICT JWT verification — requires a valid token.
 * Returns 401 if no token, expired token, or invalid token.
 * Use this on all protected routes (POST, DELETE, admin routes).
 */
export const verifyJWT = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ 
            message: "Authentication required. Please log in." 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.getById(decoded._id);

        if (!user) {
            return res.status(401).json({ 
                message: "Authentication required. Please log in." 
            });
        }

        req.user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            location: user.location || 'Commuter',
            role: user.role || Roles.COMMUTER
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }
        return res.status(401).json({ message: "Authentication required. Please log in." });
    }
};

/**
 * OPTIONAL JWT verification — sets req.user if token is present, null if not.
 * Does NOT block the request. Use for endpoints that behave differently for
 * authenticated vs unauthenticated users (e.g., /api/auth/status).
 */
export const optionalAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.getById(decoded._id);

        if (user) {
            req.user = {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                location: user.location || 'Commuter',
                role: user.role || Roles.COMMUTER
            };
        } else {
            req.user = null;
        }
    } catch (error) {
        req.user = null;
    }

    next();
};

/**
 * Requires admin role. MUST be used after verifyJWT.
 */
export const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ 
            message: "Authentication required. Please log in." 
        });
    }
    
    if (req.user.role !== Roles.ADMIN) {
        return res.status(403).json({ 
            message: "Access denied. Admin privileges required." 
        });
    }
    
    next();
};