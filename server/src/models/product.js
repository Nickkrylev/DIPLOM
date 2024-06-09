import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';
import Seller from './seller.js';
import Category from './category.js';

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manufaction: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Seller,
                key: 'id',
            },
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: 'id',
            },
        },
        description: {
            type: DataTypes.TEXT,
        },
        forState: {
            type: DataTypes.ENUM('man', 'women', 'unisex'),
        },
        color: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    { 
        sequelize, 
        modelName: 'Product', 
        timestamps: false, 
        tableName: 'products' 
    }
);

export default Product;
