import { Router } from 'express';
import categoryController from '../controllers/categoryController.js';

const router = Router();

// Route to fetch all categories
router.get('/', categoryController.getAllCategories);

// Route to get a category by ID
router.get('/:id', categoryController.getCategoryById);

// Route to create a new category
router.post('/', categoryController.createCategory);

// Route to update a category
router.put('/:id', categoryController.updateCategory);

// Route to delete a category
router.delete('/:id', categoryController.deleteCategory);

export default router;
