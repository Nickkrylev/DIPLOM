import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

class Admin extends Model {}

Admin.init(
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
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    { sequelize, modelName: 'Admin', timestamps: false, tableName: 'admins' }
);

export default Admin;
