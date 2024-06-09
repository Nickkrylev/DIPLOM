import OrderItem from '../models/orderItem';

export default {
    getAllOrderItems() {
        return OrderItem.findAll();
    },

    async getOrderItemById(itemId) {
        try {
            const item = await OrderItem.findByPk(itemId);
            return item;
        } catch (error) {
            console.error('Error retrieving order item by ID:', error);
            throw error;
        }
    },

    async createOrderItem(itemData) {
        try {
            const newItem = await OrderItem.create(itemData);
            return newItem;
        } catch (error) {
            console.error('Error creating order item:', error);
            throw error;
        }
    },

    async updateOrderItem(itemId, itemData) {
        try {
            const item = await OrderItem.findByPk(itemId);
            if (item) {
                await item.update(itemData);
                return item;
            }
            return null;
        } catch (error) {
            console.error('Error updating order item:', error);
            throw error;
        }
    },

    async deleteOrderItem(itemId) {
        try {
            const item = await OrderItem.findByPk(itemId);
            if (item) {
                await item.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting order item:', error);
            throw error;
        }
    }
};
