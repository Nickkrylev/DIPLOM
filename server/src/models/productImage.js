import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';
import Product from './product.js';

class ProductImage extends Model {}

ProductImage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.STRING,
            references: {
                model: Product,
                key: 'id',
            },
        },
        photo_description: {
            type: DataTypes.TEXT,
        },
    },
    { sequelize, modelName: 'ProductImage', timestamps: false, tableName: 'product_images' }
);

export default ProductImage;
