import productItemService from '../services/productItem';

export default {
    async getAllProductItems(req, res) {
        try {
            const items = await productItemService.getAllProductItems();
            res.status(200).json(items);
        } catch (error) {
            console.error('Failed to retrieve product items:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getProductItemById(req, res) {
        try {
            const { id } = req.params;
            const item = await productItemService.getProductItemById(id);
            if (!item) {
                return res.status(404).json({ error: 'Product item not found' });
            }
            res.status(200).json(item);
        } catch (error) {
            console.error('Failed to retrieve product item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createProductItem(req, res) {
        console.log(req.body)
        try {
            const newItem = await productItemService.createProductItem(req.body);
            res.status(201).json(newItem);
        } catch (error) {
            console.error('Failed to create product item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateProductItem(req, res) {
        try {
            const { id } = req.params;
            const updatedItem = await productItemService.updateProductItem(id, req.body);
            if (!updatedItem) {
                return res.status(404).json({ error: 'Product item not found' });
            }
            res.status(200).json(updatedItem);
        } catch (error) {
            console.error('Failed to update product item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteProductItem(req, res) {
        try {
            const { id } = req.params;
            const deleteResult = await productItemService.deleteProductItem(id);
            if (!deleteResult) {
                return res.status(404).json({ error: 'Product item not found' });
            }
            res.status(200).json({ message: 'Product item deleted successfully' });
        } catch (error) {
            console.error('Failed to delete product item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async getProductItemsByProductId(req, res) {
        try {
            const { productId } = req.params;
            const productItems = await productItemService.getProductItemsByProductId(productId);
            res.status(200).json(productItems);
        } catch (error) {
            console.error('Failed to retrieve product items by product ID:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
