import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';
import ProductImage from './productImage.js';

class ProductImageItem extends Model {}

ProductImageItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        product_image_id: {
            type: DataTypes.INTEGER,
            references: {
                model: ProductImage,
                key: 'id',
            },
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize, modelName: 'ProductImageItem', timestamps: false, tableName: 'product_image_items' }
);

export default ProductImageItem;
