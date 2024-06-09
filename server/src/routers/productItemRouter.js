import { Router } from 'express';
import productItemController from '../controllers/productItemController.js';

const router = Router();
router.get('/product/:productId', productItemController.getProductItemsByProductId);
// Route to fetch all product items
router.get('/', productItemController.getAllProductItems);

// Route to get a product item by ID
router.get('/:id', productItemController.getProductItemById);

// Route to create a new product item
router.post('/', productItemController.createProductItem);

// Route to update a product item
router.put('/:id', productItemController.updateProductItem);

// Route to delete a product item
router.delete('/:id', productItemController.deleteProductItem);

export default router;
