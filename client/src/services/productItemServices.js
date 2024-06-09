// src/services/productItemServices.js
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api';

// Function to get all product items (sizes) by product ID
export const getProductItemsByProductId = async (productId) => {
    try {
        const response = await axios.get(`/product_items/product/${productId}`);
        const productItems = response.data;

        // Map the product items to the desired format
        const sizes = productItems.map(item => ({
            size: item.size,
            count: item.quantity
        }));

        return sizes;
    } catch (error) {
        console.error('Error fetching product items by product ID:', error);
        throw error;
    }
};

