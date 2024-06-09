import productImageItemService from '../services/productImageItem.js';

export default {
    async getAllProductImageItems(req, res) {
        try {
            const items = await productImageItemService.getAllProductImageItems();
            res.status(200).json(items);
        } catch (error) {
            console.error('Failed to retrieve product image items:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getProductImageItemById(req, res) {
        try {
            const { id } = req.params;
            const item = await productImageItemService.getProductImageItemById(id);
            if (!item) {
                return res.status(404).json({ error: 'Product image item not found' });
            }
            res.status(200).json(item);
        } catch (error) {
            console.error('Failed to retrieve product image item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createProductImageItem(req, res) {
        try {
            const newItem = await productImageItemService.createProductImageItem(req.body);
            res.status(201).json(newItem);
        } catch (error) {
            console.error('Failed to create product image item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateProductImageItem(req, res) {
        try {
            const { id } = req.params;
            const updatedItem = await productImageItemService.updateProductImageItem(id, req.body);
            if (!updatedItem) {
                return res.status(404).json({ error: 'Product image item not found' });
            }
            res.status(200).json(updatedItem);
        } catch (error) {
            console.error('Failed to update product image item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteProductImageItem(req, res) {
        try {
            const { id } = req.params;
            const deleteResult = await productImageItemService.deleteProductImageItem(id);
            if (!deleteResult) {
                return res.status(404).json({ error: 'Product image item not found' });
            }
            res.status(200).json({ message: 'Product image item deleted successfully' });
        } catch (error) {
            console.error('Failed to delete product image item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
