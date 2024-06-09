import orderService from '../services/order.js';

export default {
    async getAllOrders(req, res) {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            console.error('Failed to retrieve orders:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const order = await orderService.getOrderById(id);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json(order);
        } catch (error) {
            console.error('Failed to retrieve order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createOrder(req, res) {
        try {
            const newOrder = await orderService.createOrder(req.body);
            res.status(201).json(newOrder);
        } catch (error) {
            console.error('Failed to create order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateOrder(req, res) {
        try {
            const { id } = req.params;
            const updatedOrder = await orderService.updateOrder(id, req.body);
            if (!updatedOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json(updatedOrder);
        } catch (error) {
            console.error('Failed to update order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const deleteResult = await orderService.deleteOrder(id);
            if (!deleteResult) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            console.error('Failed to delete order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
