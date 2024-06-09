import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api';

export const searchProducts = async (query) => {
    try {
        const response = await axios.get(`/products/search`, { params: { query } });
        return response.data;
    } catch (error) {
        console.error('SEARCH PRODUCTS ERROR', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};
export const getProductImagesByProductId = async (productId) => {
    try {
      const response = await axios.get(`/products/img/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product images:', error);
      throw error;
    }
};