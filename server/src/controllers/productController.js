import { sequelize } from '../db.js';
import { QueryTypes } from 'sequelize';
import productService from '../services/product';

export default {
    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error('Failed to retrieve products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async searchProducts(req, res) {
        try {
            const { query } = req.query;
            const products = await productService.searchProducts(query);
            res.status(200).json(products);
        } catch (error) {
            console.error('Failed to search products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            console.error('Failed to retrieve product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async createProduct(req, res) {
        try {
            const newProduct = await productService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Failed to create product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const updatedProduct = await productService.updateProduct(id, req.body);
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error('Failed to update product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const deleteResult = await productService.deleteProduct(id);
            if (!deleteResult) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Failed to delete product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async getProductImagesByProductId(req, res) {
        const { productId } = req.params;
        
        try {
            console.log(productId);
            const images = await sequelize.query('CALL GetProductImagesByProductId(?)', {
                replacements: [productId],
                type: QueryTypes.SELECT,
            });
            res.json(images);
        } catch (error) {
            console.error('Error fetching product images:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
