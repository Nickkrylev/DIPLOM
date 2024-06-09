import Order from '../models/order';

export default {
    getAllOrders() {
        return Order.findAll();
    },

    async getOrderById(orderId) {
        try {
            const order = await Order.findByPk(orderId);
            return order;
        } catch (error) {
            console.error('Error retrieving order by ID:', error);
            throw error;
        }
    },

    async createOrder(orderData) {
        try {
            const newOrder = await Order.create(orderData);
            return newOrder;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    async updateOrder(orderId, orderData) {
        try {
            const order = await Order.findByPk(orderId);
            if (order) {
                await order.update(orderData);
                return order;
            }
            return null;
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    },

    async deleteOrder(orderId) {
        try {
            const order = await Order.findByPk(orderId);
            if (order) {
                await order.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting order:', error);
            throw error;
        }
    }
};
