import ProductItem from '../models/productItem';

export default {
    getAllProductItems() {
        return ProductItem.findAll();
    },

    async getProductItemById(itemId) {
        try {
            const item = await ProductItem.findByPk(itemId);
            return item;
        } catch (error) {
            console.error('Error retrieving product item by ID:', error);
            throw error;
        }
    },

    async createProductItem(itemData) {
        console.log(itemData)
        try {
            const newItem = await ProductItem.create(itemData);
            return newItem;
        } catch (error) {
            console.error('Error creating product item:', error);
            throw error;
        }
    },

    async updateProductItem(itemId, itemData) {
        try {
            const item = await ProductItem.findByPk(itemId);
            if (item) {
                await item.update(itemData);
                return item;
            }
            return null;
        } catch (error) {
            console.error('Error updating product item:', error);
            throw error;
        }
    },

    async deleteProductItem(itemId) {
        try {
            const item = await ProductItem.findByPk(itemId);
            if (item) {
                await item.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting product item:', error);
            throw error;
        }
    },

    async getProductItemsByProductId(productId) {
        try {
            const productItems = await ProductItem.findAll({ where: { product_id: productId } });
            return productItems;
        } catch (error) {
            console.error('Error retrieving product items by product ID:', error);
            throw error;
        }
    }
};
