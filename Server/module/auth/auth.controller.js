// server/module/auth/auth.controller.js
import User from "../users/user.model.js";
import Auth from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Roles from "../../constant/roles.js";

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Generic error handler — prevents info leakage in production.
 * Returns a generic message to the client while logging the real error server-side.
 */
const sendError = (res, error, fallbackMsg) => {
    console.error(fallbackMsg, error);
    if (isProduction) {
        return res.status(500).json({ message: 'An internal error occurred. Please try again later.' });
    }
    return res.status(500).json({ message: fallbackMsg + ': ' + error.message });
};

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const userExists = await User.getByEmail(email);
        if (userExists) return res.status(400).json({ message: "An account with this email already exists." });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ fullName, email, role: Roles.COMMUTER }, hashedPassword);

        res.status(201).json({ message: "Account created successfully!" });
    } catch (error) {
        sendError(res, error, 'Signup error');
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.getByEmail(email);

        // SECURITY: Use generic message for both "user not found" and "wrong password"
        // to prevent user enumeration attacks
        if (!user) {
            // Still hash a dummy password to maintain timing consistency
            await bcrypt.hash('dummy-password-for-timing', 10);
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isMatch = await Auth.compare(user._id, password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Include role in JWT token
        const userRole = user.role || Roles.COMMUTER;

        const token = jwt.sign(
            { _id: user._id, role: userRole },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        await Auth.updateLastLogin(user._id);

        const userResponse = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone || '',
            role: userRole,
            location: user.location || 'Commuter'
        };

        console.log('Login successful:', userResponse.email, 'Role:', userRole);

        res.status(200).json({
            message: "Login successful!",
            user: userResponse
        });
    } catch (error) {
        sendError(res, error, 'Login error');
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully." });
};

export const getStatus = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(200).json({ isAuthenticated: false, user: null });
        }

        const user = await User.getById(req.user._id);

        if (!user) {
            return res.status(200).json({ isAuthenticated: false, user: null });
        }

        const userResponse = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone || '',
            role: user.role || Roles.COMMUTER,
            location: user.location || 'Commuter'
        };

        res.status(200).json({
            isAuthenticated: true,
            user: userResponse
        });
    } catch (error) {
        // Don't leak error details
        console.error('Status check error:', error);
        res.status(200).json({ isAuthenticated: false, user: null });
    }
};