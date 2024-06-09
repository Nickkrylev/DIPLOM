import { Router } from 'express';
import productImageController from '../controllers/productImageController';

const router = Router();

// Route to fetch all product images
router.get('/', productImageController.getAllProductImages);

// Route to get a product image by ID
router.get('/:id', productImageController.getProductImageById);

// Route to create a new product image
router.post('/', productImageController.createProductImage);

// Route to update a product image
router.put('/:id', productImageController.updateProductImage);

// Route to delete a product image
router.delete('/:id', productImageController.deleteProductImage);

export default router;
