import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';
import Product from './product.js';

class ProductItem extends Model {}

ProductItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Product,
                key: 'id',
            },
        },
  
        size: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    { sequelize, modelName: 'ProductItem', timestamps: false, tableName: 'product_items' }
);

export default ProductItem;
