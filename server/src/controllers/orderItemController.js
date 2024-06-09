import orderItemService from '../services/orderItem';

export default {
    async getAllOrderItems(req, res) {
        try {
            const items = await orderItemService.getAllOrderItems();
            res.status(200).json(items);
        } catch (error) {
            console.error('Failed to retrieve order items:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getOrderItemById(req, res) {
        try {
            const { id } = req.params;
            const item = await orderItemService.getOrderItemById(id);
            if (!item) {
                return res.status(404).json({ error: 'Order item not found' });
            }
            res.status(200).json(item);
        } catch (error) {
            console.error('Failed to retrieve order item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createOrderItem(req, res) {
        try {
            const newItem = await orderItemService.createOrderItem(req.body);
            res.status(201).json(newItem);
        } catch (error) {
            console.error('Failed to create order item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateOrderItem(req, res) {
        try {
            const { id } = req.params;
            const updatedItem = await orderItemService.updateOrderItem(id, req.body);
            if (!updatedItem) {
                return res.status(404).json({ error: 'Order item not found' });
            }
            res.status(200).json(updatedItem);
        } catch (error) {
            console.error('Failed to update order item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteOrderItem(req, res) {
        try {
            const { id } = req.params;
            const deleteResult = await orderItemService.deleteOrderItem(id);
            if (!deleteResult) {
                return res.status(404).json({ error: 'Order item not found' });
            }
            res.status(200).json({ message: 'Order item deleted successfully' });
        } catch (error) {
            console.error('Failed to delete order item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
