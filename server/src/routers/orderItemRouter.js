import { Router } from 'express';
import orderItemController from '../controllers/orderItemController.js';

const router = Router();

// Route to fetch all order items
router.get('/', orderItemController.getAllOrderItems);

// Route to get an order item by ID
router.get('/:id', orderItemController.getOrderItemById);

// Route to create a new order item
router.post('/', orderItemController.createOrderItem);

// Route to update an order item
router.put('/:id', orderItemController.updateOrderItem);

// Route to delete an order item
router.delete('/:id', orderItemController.deleteOrderItem);

export default router;
