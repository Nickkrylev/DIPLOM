import { Router } from 'express';
import sellerAdminController from '../controllers/sellerAdminController.js';

const router = Router();

// Route to fetch all buyer admins
router.get('/', sellerAdminController.getAllBuyerAdmins);
router.post('/login', sellerAdminController.sellerLogEmail);
// Route to get a buyer admin by ID
router.get('/:id', sellerAdminController.getBuyerAdminById);

// Route to create a new buyer admin
router.post('/', sellerAdminController.createBuyerAdmin);

// Route to update a buyer admin
router.put('/:id', sellerAdminController.updateBuyerAdmin);

// Route to delete a buyer admin
router.delete('/:id', sellerAdminController.deleteBuyerAdmin);

export default router;
