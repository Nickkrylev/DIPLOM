import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';
import bcrypt from 'bcrypt';

class Client extends Model {}

Client.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
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
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Client',
        timestamps: false,
        tableName: 'clients',
        hooks: {
            beforeCreate: async (client) => {
                if (client.hashed_password) {
                    const salt = await bcrypt.genSalt(10);
                    client.hashed_password = await bcrypt.hash(client.hashed_password, salt);
                }
            },
        },
    }
);

export default Client;
