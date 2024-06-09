import { Router } from 'express';
import productController from '../controllers/productController';

const router = Router();
router.get('/search', productController.searchProducts);
router.get('/img/:productId', productController.getProductImagesByProductId);


// Route to fetch all products
router.get('/', productController.getAllProducts);

// Route to get a product by ID
router.get('/:id', productController.getProductById);

// Route to create a new product
router.post('/', productController.createProduct);

// Route to update a product
router.put('/:id', productController.updateProduct);

// Route to delete a product
router.delete('/:id', productController.deleteProduct);

export default router;
