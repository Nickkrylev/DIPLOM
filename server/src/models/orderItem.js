import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';
import Order from './order.js';
import ProductItem from './productItem.js';

class OrderItem extends Model {}

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        order_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Order,
                key: 'id',
            },
        },
        product_item_id: {
            type: DataTypes.STRING,
            references: {
                model: ProductItem,
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
        }
    
    },
    { sequelize, modelName: 'OrderItem', timestamps: false, tableName: 'order_items' }
);

export default OrderItem;
