import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

import Seller from './seller.js';

class SellerAdmin extends Model {}

SellerAdmin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        hashed_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Seller,
                key: 'id',
            },
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    { sequelize, modelName: 'SellerAdmin', timestamps: false, tableName: 'seller_admin' }
);

export default SellerAdmin;
