// server/module/drivers/driver.controller.js
import DriverModel from "./driver.model.js";
import Roles from "../../constant/roles.js";

const isProduction = process.env.NODE_ENV === 'production';

const sendError = (res, error, fallbackMsg) => {
    console.error(fallbackMsg, error);
    if (isProduction) {
        return res.status(500).json({ message: 'An internal error occurred. Please try again later.' });
    }
    return res.status(500).json({ message: fallbackMsg + ': ' + error.message });
};

/**
 * Apply to become a driver (multi-step registration submission)
 */
export const applyDriver = async (req, res) => {
    try {
        const {
            fullName, email, phone, address, birthdate,
            vehicleType, vehicleMake, vehicleModel, vehicleYear, vehicleColor, plateNumber,
            licenseNumber, licenseExpiry, licenseImageUrl, validIdUrl, vehiclePhotoUrl,
            acceptedTerms
        } = req.body;

        // Validation
        if (!fullName || !email || !phone) {
            return res.status(400).json({ message: "Full name, email, and phone are required." });
        }

        if (!acceptedTerms) {
            return res.status(400).json({ message: "You must accept the terms and conditions." });
        }

        // Check if email already applied
        const existing = await DriverModel.findByEmail(email);
        if (existing) {
            if (existing.status === "pending") {
                return res.status(400).json({ message: "You already have a pending application." });
            }
            if (existing.status === "approved") {
                return res.status(400).json({ message: "This email is already registered as a driver." });
            }
        }

        // Check if user already has a pending application
        if (req.user) {
            const hasPending = await DriverModel.hasPendingApplication(req.user._id);
            if (hasPending) {
                return res.status(400).json({ message: "You already have a pending application." });
            }
        }

        const driver = await DriverModel.create({
            fullName, email, phone, address, birthdate,
            vehicleType, vehicleMake, vehicleModel, vehicleYear, vehicleColor, plateNumber,
            licenseNumber, licenseExpiry, licenseImageUrl, validIdUrl, vehiclePhotoUrl,
            acceptedTerms,
            userId: req.user?._id || null
        });

        res.status(201).json({
            success: true,
            message: "Driver application submitted successfully! We'll review your application and get back to you.",
            data: driver
        });
    } catch (error) {
        sendError(res, error, 'Driver application error');
    }
};

/**
 * Check driver application status for logged-in user
 */
export const getMyDriverStatus = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required." });
        }

        const applications = await DriverModel.findByUserId(req.user._id);
        res.json({
            success: true,
            data: applications.length > 0 ? applications[0] : null
        });
    } catch (error) {
        sendError(res, error, 'Error fetching driver status');
    }
};

// ========== ADMIN CONTROLLERS ==========

/**
 * Get all driver applications (admin only)
 */
export const getAllDrivers = async (req, res) => {
    try {
        if (req.user.role !== Roles.ADMIN) {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const drivers = await DriverModel.findAll();
        res.json({ success: true, data: drivers });
    } catch (error) {
        sendError(res, error, 'Error fetching drivers');
    }
};

/**
 * Get driver applications by status (admin only)
 */
export const getDriversByStatus = async (req, res) => {
    try {
        if (req.user.role !== Roles.ADMIN) {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const { status } = req.params;
        const validStatuses = ["pending", "approved", "rejected", "suspended"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status. Use: pending, approved, rejected, suspended" });
        }

        const drivers = await DriverModel.findByStatus(status);
        res.json({ success: true, data: drivers });
    } catch (error) {
        sendError(res, error, 'Error fetching drivers by status');
    }
};

/**
 * Approve a driver application (admin only)
 */
export const approveDriver = async (req, res) => {
    try {
        if (req.user.role !== Roles.ADMIN) {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const { id } = req.params;
        const driver = await DriverModel.findById(id);

        if (!driver) {
            return res.status(404).json({ message: "Driver application not found." });
        }

        if (driver.status !== "pending") {
            return res.status(400).json({ message: `Cannot approve. Application is already ${driver.status}.` });
        }

        await DriverModel.approve(id, req.user.fullName || 'Admin');

        // Update user role to DRIVER if linked to a user account
        if (driver.userId) {
            await DriverModel.updateUserRole(driver.userId);
        }

        const updated = await DriverModel.findById(id);
        res.json({
            success: true,
            message: "Driver application approved!",
            data: updated
        });
    } catch (error) {
        sendError(res, error, 'Error approving driver');
    }
};

/**
 * Reject a driver application (admin only)
 */
export const rejectDriver = async (req, res) => {
    try {
        if (req.user.role !== Roles.ADMIN) {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const { id } = req.params;
        const { notes } = req.body;

        const driver = await DriverModel.findById(id);
        if (!driver) {
            return res.status(404).json({ message: "Driver application not found." });
        }

        if (driver.status !== "pending") {
            return res.status(400).json({ message: `Cannot reject. Application is already ${driver.status}.` });
        }

        await DriverModel.reject(id, req.user.fullName || 'Admin', notes);

        const updated = await DriverModel.findById(id);
        res.json({
            success: true,
            message: "Driver application rejected.",
            data: updated
        });
    } catch (error) {
        sendError(res, error, 'Error rejecting driver');
    }
};

/**
 * Get driver application stats (admin only)
 */
export const getDriverStats = async (req, res) => {
    try {
        if (req.user.role !== Roles.ADMIN) {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const stats = await DriverModel.getStats();
        res.json({ success: true, data: stats });
    } catch (error) {
        sendError(res, error, 'Error fetching driver stats');
    }
};

/**
 * Delete a driver application (admin only)
 */
export const deleteDriver = async (req, res) => {
    try {
        if (req.user.role !== Roles.ADMIN) {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        await DriverModel.deleteById(req.params.id);
        res.json({ success: true, message: "Driver application deleted." });
    } catch (error) {
        sendError(res, error, 'Error deleting driver');
    }
};
