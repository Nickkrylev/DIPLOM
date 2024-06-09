import { Router } from 'express';
import adminController from '../controllers/adminController';

const router = Router();

// Route to fetch all admins
router.get('/', adminController.getAllAdmins);
router.post('/login', adminController.getAdminByLogin);

router.get('/', adminController.getAllAdmins);
// Route to get an admin by ID
router.get('/:id', adminController.getAdminById);

// Route to create a new admin
router.post('/', adminController.createAdmin);

// Route to update an admin
router.put('/:id', adminController.updateAdmin);

// Route to delete an admin
router.delete('/:id', adminController.deleteAdmin);

export default router;
