import productImageService from '../services/productImage';

export default {
    async getAllProductImages(req, res) {
        try {
            const images = await productImageService.getAllProductImages();
            res.status(200).json(images);
        } catch (error) {
            console.error('Failed to retrieve product images:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getProductImageById(req, res) {
        try {
            const { id } = req.params;
            const image = await productImageService.getProductImageById(id);
            if (!image) {
                return res.status(404).json({ error: 'Product image not found' });
            }
            res.status(200).json(image);
        } catch (error) {
            console.error('Failed to retrieve product image:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createProductImage(req, res) {
        try {
            const newImage = await productImageService.createProductImage(req.body);
            res.status(201).json(newImage);
        } catch (error) {
            console.error('Failed to create product image:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateProductImage(req, res) {
        try {
            const { id } = req.params;
            const updatedImage = await productImageService.updateProductImage(id, req.body);
            if (!updatedImage) {
                return res.status(404).json({ error: 'Product image not found' });
            }
            res.status(200).json(updatedImage);
        } catch (error) {
            console.error('Failed to update product image:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteProductImage() {
        try {
            const { id } = req.params;
            const deleteResult = await productImageService.deleteProductImage(id);
            if (!deleteResult) {
                return res.status(404).json({ error: 'Product image not found' });
            }
            res.status(200).json({ message: 'Product image deleted successfully' });
        } catch (error) {
            console.error('Failed to delete product image:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
      
    
};
