import connectDB from "../../config/db.js";
import { ObjectId } from "mongodb";
import Roles from "../../constant/roles.js";

class User {
    static #userColl = "users";
    static #authColl = "auth";

    static async create(userData, hashedPassword) {
        const db = await connectDB();

        const userProfile = {
            fullName: userData.fullName,
            email: userData.email.toLowerCase(),
            role: userData.role || Roles.COMMUTER,
            location: userData.location || 'Commuter',
            createdAt: new Date(),
            lastLogin: null,
            updatedAt: new Date()
        };

        const userResult = await db.collection(this.#userColl).insertOne(userProfile);
        const userId = userResult.insertedId;

        await db.collection(this.#authColl).insertOne({
            userId: userId,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return userId;
    }

    static async getById(id) {
        try {
            const db = await connectDB();
            const user = await db.collection(this.#userColl).findOne({ _id: new ObjectId(id) });

            if (user) {
                user.fullName = user.fullName || 'User';
                user.location = user.location || 'Commuter';
                user.role = user.role || Roles.COMMUTER;
            }

            return user;
        } catch (error) {
            console.error('Error in getById:', error);
            return null;
        }
    }

    static async getByEmail(email) {
        try {
            const db = await connectDB();
            const user = await db.collection(this.#userColl).findOne({ email: email.toLowerCase() });

            if (user) {
                user.fullName = user.fullName || 'User';
                user.location = user.location || 'Commuter';
                user.role = user.role || Roles.COMMUTER;
            }

            return user;
        } catch (error) {
            console.error('Error in getByEmail:', error);
            return null;
        }
    }

    static async updateLastLogin(id) {
        try {
            const db = await connectDB();
            return await db.collection(this.#userColl).updateOne(
                { _id: new ObjectId(id) },
                { $set: { lastLogin: new Date(), updatedAt: new Date() } }
            );
        } catch (error) {
            console.error('Error in updateLastLogin:', error);
            return null;
        }
    }

    static async updateLocation(id, location) {
        try {
            const db = await connectDB();
            return await db.collection(this.#userColl).updateOne(
                { _id: new ObjectId(id) },
                { $set: { location: location, updatedAt: new Date() } }
            );
        } catch (error) {
            console.error('Error in updateLocation:', error);
            return null;
        }
    }

    // ========== ADMIN METHODS ==========
    
    // Get all users (for admin panel)
    static async getAllUsers() {
        try {
            const db = await connectDB();
            return await db.collection(this.#userColl)
                .find({}, { projection: { password: 0 } })
                .sort({ createdAt: -1 })
                .toArray();
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            return [];
        }
    }

    // Update user role (for admin panel)
    static async updateRole(id, role) {
        try {
            const db = await connectDB();
            // Validate role
            if (role !== Roles.ADMIN && role !== Roles.COMMUTER) {
                throw new Error('Invalid role');
            }
            
            return await db.collection(this.#userColl).updateOne(
                { _id: new ObjectId(id) },
                { $set: { role: role, updatedAt: new Date() } }
            );
        } catch (error) {
            console.error('Error in updateRole:', error);
            return null;
        }
    }

    // Get users by role
    static async getUsersByRole(role) {
        try {
            const db = await connectDB();
            return await db.collection(this.#userColl)
                .find({ role: role })
                .sort({ createdAt: -1 })
                .toArray();
        } catch (error) {
            console.error('Error in getUsersByRole:', error);
            return [];
        }
    }

    // Delete user (for admin)
    static async deleteById(id) {
        try {
            const db = await connectDB();
            // Delete auth record first
            await db.collection(this.#authColl).deleteOne({ userId: new ObjectId(id) });
            // Then delete user
            return await db.collection(this.#userColl).deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error('Error in deleteById:', error);
            return null;
        }
    }

    // Get user count
    static async getUserCount() {
        try {
            const db = await connectDB();
            return await db.collection(this.#userColl).countDocuments();
        } catch (error) {
            console.error('Error in getUserCount:', error);
            return 0;
        }
    }

    // Get admin users
    static async getAdmins() {
        try {
            const db = await connectDB();
            return await db.collection(this.#userColl)
                .find({ role: Roles.ADMIN })
                .toArray();
        } catch (error) {
            console.error('Error in getAdmins:', error);
            return [];
        }
    }
}

export default User;