import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

class Seller extends Model {}

Seller.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name_company: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        telephone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    { sequelize, modelName: 'Seller', timestamps: false, tableName: 'seller' }
);

export default Seller;
