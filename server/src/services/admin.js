import Admin from '../models/admin.js';

export default {
    getAllAdmins() {
        return Admin.findAll();
    },
    async getAdminByLogin(email, hashed_password) {
        try {
            const admin = await Admin.findOne({ where: { email, hashed_password } });
            return admin;
        } catch (error) {
            console.error('Error retrieving admin by login:', error);
            throw error;
        }
    },

    async getAdminById(adminId) {
        try {
            const admin = await Admin.findByPk(adminId);
            return admin;
        } catch (error) {
            console.error('Error retrieving admin by ID:', error);
            throw error;
        }
    },

    async createAdmin(adminData) {
        try {
            const newAdmin = await Admin.create(adminData);
            return newAdmin;
        } catch (error) {
            console.error('Error creating admin:', error);
            throw error;
        }
    },

    async updateAdmin(adminId, adminData) {
        try {
            const admin = await Admin.findByPk(adminId);
            if (admin) {
                await admin.update(adminData);
                return admin;
            }
            return null;
        } catch (error) {
            console.error('Error updating admin:', error);
            throw error;
        }
    },

    async deleteAdmin(adminId) {
        try {
            const admin = await Admin.findByPk(adminId);
            if (admin) {
                await admin.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting admin:', error);
            throw error;
        }
    }
};
