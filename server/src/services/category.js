import Category from '../models/category';

export default {
    getAllCategories() {
        return Category.findAll();
    },

    async getCategoryById(categoryId) {
        try {
            const category = await Category.findByPk(categoryId);
            return category;
        } catch (error) {
            console.error('Error retrieving category by ID:', error);
            throw error;
        }
    },

    async createCategory(categoryData) {
        try {
            const newCategory = await Category.create(categoryData);
            return newCategory;
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    },

    async updateCategory(categoryId, categoryData) {
        try {
            const category = await Category.findByPk(categoryId);
            if (category) {
                await category.update(categoryData);
                return category;
            }
            return null;
        } catch (error) {
            console.error('Error updating category:', error);
            throw error;
        }
    },

    async deleteCategory(categoryId) {
        try {
            const category = await Category.findByPk(categoryId);
            if (category) {
                await category.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    }
};
