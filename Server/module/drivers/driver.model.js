import connectDB from "../../config/db.js";
import { ObjectId } from "mongodb";
import Roles from "../../constant/roles.js";

class DriverModel {
    static #collection = "drivers";

    // Create a new driver application
    static async create(data) {
        const db = await connectDB();

        const newDriver = {
            // Personal Information
            fullName: data.fullName,
            email: (data.email || "").toLowerCase(),
            phone: data.phone,
            address: data.address,
            birthdate: data.birthdate ? new Date(data.birthdate) : null,

            // Vehicle Information
            vehicleType: data.vehicleType || "jeepney",
            vehicleMake: data.vehicleMake,
            vehicleModel: data.vehicleModel,
            vehicleYear: parseInt(data.vehicleYear) || null,
            vehicleColor: data.vehicleColor,
            plateNumber: (data.plateNumber || "").toUpperCase(),

            // License & Documents
            licenseNumber: (data.licenseNumber || "").toUpperCase(),
            licenseExpiry: data.licenseExpiry ? new Date(data.licenseExpiry) : null,
            licenseImageUrl: data.licenseImageUrl || "",
            validIdUrl: data.validIdUrl || "",
            vehiclePhotoUrl: data.vehiclePhotoUrl || "",

            // Terms acceptance
            acceptedTerms: data.acceptedTerms || false,

            // Status tracking
            status: "pending", // pending | approved | rejected | suspended
            userId: data.userId ? new ObjectId(data.userId) : null,
            reviewedBy: null,
            reviewedAt: null,
            reviewNotes: "",

            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection(this.#collection).insertOne(newDriver);
        return { ...newDriver, _id: result.insertedId };
    }

    // Find driver by ID
    static async findById(id) {
        try {
            const db = await connectDB();
            return await db.collection(this.#collection).findOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error("Error in DriverModel.findById:", error);
            return null;
        }
    }

    // Find driver by user ID
    static async findByUserId(userId) {
        try {
            const db = await connectDB();
            return await db.collection(this.#collection)
                .find({ userId: new ObjectId(userId) })
                .sort({ createdAt: -1 })
                .toArray();
        } catch (error) {
            console.error("Error in DriverModel.findByUserId:", error);
            return [];
        }
    }

    // Find driver by email
    static async findByEmail(email) {
        try {
            const db = await connectDB();
            return await db.collection(this.#collection).findOne({ email: email.toLowerCase() });
        } catch (error) {
            console.error("Error in DriverModel.findByEmail:", error);
            return null;
        }
    }

    // Check if user already has a pending application
    static async hasPendingApplication(userId) {
        try {
            const db = await connectDB();
            const existing = await db.collection(this.#collection).findOne({
                userId: new ObjectId(userId),
                status: "pending"
            });
            return !!existing;
        } catch (error) {
            console.error("Error in DriverModel.hasPendingApplication:", error);
            return false;
        }
    }

    // Get all drivers (for admin)
    static async findAll(sort = { createdAt: -1 }) {
        try {
            const db = await connectDB();
            return await db.collection(this.#collection)
                .find()
                .sort(sort)
                .toArray();
        } catch (error) {
            console.error("Error in DriverModel.findAll:", error);
            return [];
        }
    }

    // Get drivers by status
    static async findByStatus(status) {
        try {
            const db = await connectDB();
            return await db.collection(this.#collection)
                .find({ status })
                .sort({ createdAt: -1 })
                .toArray();
        } catch (error) {
            console.error("Error in DriverModel.findByStatus:", error);
            return [];
        }
    }

    // Approve driver application
    static async approve(id, adminName) {
        try {
            const db = await connectDB();
            return await db.collection(this.#collection).updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        status: "approved",
                        reviewedBy: adminName,
                        reviewedAt: new Date(),
                        updatedAt: new Date()
                    }
                }
            );
        } catch (error) {
            console.error("Error in DriverModel.approve:", error);
            return null;
        }
    }

    // Reject driver application
    static async reject(id, adminName, notes) {
        try {
            const db = await connectDB();
            return await db.collection(this.#collection).updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        status: "rejected",
                        reviewedBy: adminName,
                        reviewedAt: new Date(),
                        reviewNotes: notes || "",
                        updatedAt: new Date()
                    }
                }
            );
        } catch (error) {
            console.error("Error in DriverModel.reject:", error);
            return null;
        }
    }

    // Suspend a driver
    static async suspend(id, adminName, reason) {
        try {
            const db = await connectDB();
            return await db.collection(this.#collection).updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        status: "suspended",
                        reviewedBy: adminName,
                        reviewedAt: new Date(),
                        reviewNotes: reason || "",
                        updatedAt: new Date()
                    }
                }
            );
        } catch (error) {
            console.error("Error in DriverModel.suspend:", error);
            return null;
        }
    }

    // Delete driver application
    static async deleteById(id) {
        try {
            const db = await connectDB();
            return await db.collection(this.#collection).deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error("Error in DriverModel.deleteById:", error);
            return null;
        }
    }

    // Get driver stats
    static async getStats() {
        try {
            const db = await connectDB();
            const [pending, approved, rejected, total] = await Promise.all([
                db.collection(this.#collection).countDocuments({ status: "pending" }),
                db.collection(this.#collection).countDocuments({ status: "approved" }),
                db.collection(this.#collection).countDocuments({ status: "rejected" }),
                db.collection(this.#collection).countDocuments()
            ]);
            return { total, pending, approved, rejected };
        } catch (error) {
            console.error("Error in DriverModel.getStats:", error);
            return { total: 0, pending: 0, approved: 0, rejected: 0 };
        }
    }

    // Update driver profile by id
    static async updateById(id, updateData) {
        try {
            const db = await connectDB();
            updateData.updatedAt = new Date();
            return await db.collection(this.#collection).updateOne(
                { _id: new ObjectId(id) },
                { $set: updateData }
            );
        } catch (error) {
            console.error("Error in DriverModel.updateById:", error);
            return null;
        }
    }

    // Update user role to DRIVER after approval
    static async updateUserRole(userId) {
        try {
            const db = await connectDB();
            return await db.collection("users").updateOne(
                { _id: new ObjectId(userId) },
                { $set: { role: Roles.DRIVER, updatedAt: new Date() } }
            );
        } catch (error) {
            console.error("Error in DriverModel.updateUserRole:", error);
            return null;
        }
    }
}

export default DriverModel;
