import { Router } from 'express';
import productImageItemController from '../controllers/productImageItemController';

const router = Router();

// Route to fetch all product image items
router.get('/', productImageItemController.getAllProductImageItems);

// Route to get a product image item by ID
router.get('/:id', productImageItemController.getProductImageItemById);

// Route to create a new product image item
router.post('/', productImageItemController.createProductImageItem);

// Route to update a product image item
router.put('/:id', productImageItemController.updateProductImageItem);

// Route to delete a product image item
router.delete('/:id', productImageItemController.deleteProductImageItem);

export default router;
