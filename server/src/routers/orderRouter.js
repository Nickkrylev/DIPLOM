import { Router } from 'express';
import orderController from '../controllers/orderController';

const router = Router();

// Route to fetch all orders
router.get('/', orderController.getAllOrders);

// Route to get an order by ID
router.get('/:id', orderController.getOrderById);

// Route to create a new order
router.post('/', orderController.createOrder);

// Route to update an order
router.put('/:id', orderController.updateOrder);

// Route to delete an order
router.delete('/:id', orderController.deleteOrder);

export default router;
