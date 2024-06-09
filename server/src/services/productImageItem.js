import ProductImageItem from '../models/productImageItem';

export default {
    getAllProductImageItems() {
        return ProductImageItem.findAll();
    },

    async getProductImageItemById(itemId) {
        try {
            const item = await ProductImageItem.findByPk(itemId);
            return item;
        } catch (error) {
            console.error('Error retrieving product image item by ID:', error);
            throw error;
        }
    },

    async createProductImageItem(itemData) {
        try {
            const newItem = await ProductImageItem.create(itemData);
            return newItem;
        } catch (error) {
            console.error('Error creating product image item:', error);
            throw error;
        }
    },

    async updateProductImageItem(itemId, itemData) {
        try {
            const item = await ProductImageItem.findByPk(itemId);
            if (item) {
                await item.update(itemData);
                return item;
            }
            return null;
        } catch (error) {
            console.error('Error updating product image item:', error);
            throw error;
        }
    },

    async deleteProductImageItem(itemId) {
        try {
            const item = await ProductImageItem.findByPk(itemId);
            if (item) {
                await item.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting product image item:', error);
            throw error;
        }
    }
};
