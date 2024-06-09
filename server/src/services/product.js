import { Op } from 'sequelize';
import Product from '../models/product';

export default {
    getAllProducts() {
        return Product.findAll();
    },

    async getProductById(productId) {
        try {
            const product = await Product.findByPk(productId);
            return product;
        } catch (error) {
            console.error('Error retrieving product by ID:', error);
            throw error;
        }
    },

    async createProduct(productData) {
        try {
            const newProduct = await Product.create(productData);
            return newProduct;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    async updateProduct(productId, productData) {
        try {
            const product = await Product.findByPk(productId);
            if (product) {
                await product.update(productData);
                return product;
            }
            return null;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    async deleteProduct(productId) {
        try {
            const product = await Product.findByPk(productId);
            if (product) {
                await product.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    },

    async searchProducts(query) {
        try {
            const products = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${query}%`
                    }
                }
            });
            return products;
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    }
};
