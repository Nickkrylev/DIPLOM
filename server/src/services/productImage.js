import ProductImage from '../models/productImage';

export default {
    getAllProductImages() {
        return ProductImage.findAll();
    },

    async getProductImageById(imageId) {
        try {
            const image = await ProductImage.findByPk(imageId);
            return image;
        } catch (error) {
            console.error('Error retrieving product image by ID:', error);
            throw error;
        }
    },

    async createProductImage(imageData) {
        try {
            const newImage = await ProductImage.create(imageData);
            return newImage;
        } catch (error) {
            console.error('Error creating product image:', error);
            throw error;
        }
    },

    async updateProductImage(imageId, imageData) {
        try {
            const image = await ProductImage.findByPk(imageId);
            if (image) {
                await image.update(imageData);
                return image;
            }
            return null;
        } catch (error) {
            console.error('Error updating product image:', error);
            throw error;
        }
    },

    async deleteProductImage(imageId) {
        try {
            const image = await ProductImage.findByPk(imageId);
            if (image) {
                await image.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting product image:', error);
            throw error;
        }
    },
    async getProductImagesByProductId (productId)  {
        try {
          const images = await sequelize.query('CALL GetProductImagesByProductId(:productId)', {
            replacements: { productId },
            type: QueryTypes.SELECT,
          });
          return images;
        } catch (error) {
          console.error('Error fetching product images:', error);
          throw error;
        }
      }
    
};
