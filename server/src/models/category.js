import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

class Category extends Model {}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
    },
    { sequelize, modelName: 'Category', timestamps: false, tableName: 'categories' }
);

export default Category;
