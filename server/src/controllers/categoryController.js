import categoryService from '../services/category.js';

export default {
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            console.error('Failed to retrieve categories:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await categoryService.getCategoryById(id);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json(category);
        } catch (error) {
            console.error('Failed to retrieve category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createCategory(req, res) {
        try {
            const newCategory = await categoryService.createCategory(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            console.error('Failed to create category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const updatedCategory = await categoryService.updateCategory(id, req.body);
            if (!updatedCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json(updatedCategory);
        } catch (error) {
            console.error('Failed to update category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const deleteResult = await categoryService.deleteCategory(id);
            if (!deleteResult) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Failed to delete category:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
