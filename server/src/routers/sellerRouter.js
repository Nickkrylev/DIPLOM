import { Router } from 'express';
import sellerController from '../controllers/sellerController';

const router = Router();

// Route to fetch all buyers
router.get('/', sellerController.getAllBuyers);

// Route to get a buyer by ID
router.get('/:id', sellerController.getBuyerById);

// Route to create a new buyer
router.post('/', sellerController.createBuyer);

// Route to update a buyer
router.put('/:id', sellerController.updateBuyer);

// Route to delete a buyer
router.delete('/:id', sellerController.deleteBuyer);

export default router;
