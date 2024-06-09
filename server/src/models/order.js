import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';
import Client from './client.js';

class Order extends Model {}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Client,
                key: 'id',
            },
        },
        order_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.ENUM('cancel', 'confirm', 'wait', 'wait delivery'),
        },
        description_delivery: {
            type: DataTypes.TEXT,
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
        },
    },
    { sequelize, modelName: 'Order', timestamps: false, tableName: 'orders' }
);

export default Order;
