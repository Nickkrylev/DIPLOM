
import Seller from '../models/seller';
export default {
    getAllBuyers() {
        return Seller.findAll();
    },

    async getBuyerById(buyerId) {
        try {
            const buyer = await Seller.findByPk(buyerId);
            return buyer;
        } catch (error) {
            console.error('Error retrieving buyer by ID:', error);
            throw error;
        }
    },

    async createBuyer(buyerData) {
        try {
            const newBuyer = await Seller.create(buyerData);
            return newBuyer;
        } catch (error) {
            console.error('Error creating buyer:', error);
            throw error;
        }
    },

    async updateBuyer(buyerId, buyerData) {
        try {
            const buyer = await Seller.findByPk(buyerId);
            if (buyer) {
                await buyer.update(buyerData);
                return buyer;
            }
            return null;
        } catch (error) {
            console.error('Error updating buyer:', error);
            throw error;
        }
    },

    async deleteBuyer(buyerId) {
        try {
            const buyer = await Seller.findByPk(buyerId);
            if (buyer) {
                 await buyer.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting buyer:', error);
            throw error;
        }
    }
};
