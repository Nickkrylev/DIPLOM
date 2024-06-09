import adminService from '../services/admin.js';

export default {
    async getAllAdmins(req, res) {
        try {
            const admins = await adminService.getAllAdmins();
            res.status(200).json(admins);
        } catch (error) {
            console.error('Failed to retrieve admins:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getAdminById(req, res) {
        try {
            const { id } = req.params;
            const admin = await adminService.getAdminById(id);
            if (!admin) {
                return res.status(404).json({ error: 'Admin not found' });
            }
            res.status(200).json(admin);
        } catch (error) {
            console.error('Failed to retrieve admin:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getAdminByLogin(req, res) {
        try {
            const { email, password } = req.body;
            console.log(email, password);
            const admin = await adminService.getAdminByLogin(email, password);
            if (!admin) {
                return res.status(404).json({ error: 'Admin not found' });
            }
            res.status(200).json(admin);
        } catch (error) {
            console.error('Failed to retrieve admin by login:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createAdmin(req, res) {
        try {
            const newAdmin = await adminService.createAdmin(req.body);
            res.status(201).json(newAdmin);
        } catch (error) {
            console.error('Failed to create admin:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateAdmin(req, res) {
        try {
            const { id } = req.params;
            const updatedAdmin = await adminService.updateAdmin(id, req.body);
            if (!updatedAdmin) {
                return res.status(404).json({ error: 'Admin not found' });
            }
            res.status(200).json(updatedAdmin);
        } catch (error) {
            console.error('Failed to update admin:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteAdmin(req, res) {
        try {
            const { id } = req.params;
            const deleteResult = await adminService.deleteAdmin(id);
            if (!deleteResult) {
                return res.status(404).json({ error: 'Admin not found' });
            }
            res.status(200).json({ message: 'Admin deleted successfully' });
        } catch (error) {
            console.error('Failed to delete admin:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
