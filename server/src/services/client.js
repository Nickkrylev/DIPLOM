import Client from '../models/client';
import bcrypt from 'bcrypt';

export default {
    getAllClients() {
        return Client.findAll();
    },

    async getClientById(clientId) {
        try {
            const client = await Client.findByPk(clientId);
            return client;
        } catch (error) {
            console.error('Error retrieving client by ID:', error);
            throw error;
        }
    },

    async getClientByEmail(email) {
        try {
            const client = await Client.findOne({ where: { email } });
            return client;
        } catch (error) {
            console.error('Error retrieving client by email:', error);
            throw error;
        }
    },

    async createClient(clientData) {
        try {
           
            const newClient = await Client.create(clientData);
            return newClient;
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError' || error.original?.code === 'ER_DUP_ENTRY') {
                console.error('Duplicate email error:', error);
                throw new Error('Email already exists');
            } else {
                console.error('Error creating client:', error);
                throw error;
            }
        }
    },

    async updateClient(clientId, clientData) {
        try {
            const client = await Client.findByPk(clientId);
            if (client) {
                if (clientData.hashed_password) {
                    const salt = await bcrypt.genSalt(10);
                    clientData.hashed_password = await bcrypt.hash(clientData.hashed_password, salt);
                }
                await client.update(clientData);
                return client;
            }
            return null;
        } catch (error) {
            console.error('Error updating client:', error);
            throw error;
        }
    },

    async deleteClient(clientId) {
        try {
            const client = await Client.findByPk(clientId);
            if (client) {
                await client.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting client:', error);
            throw error;
        }
    },

    async loginClient(email, password) {
        try {
            const client = await Client.findOne({ where: { email } });
            console.log(email,password);
            if (!client) {
                throw new Error('Client not found');
            }
            const isMatch = await bcrypt.compare(password, client.hashed_password);
            console.log(isMatch)
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            return client;
        } catch (error) {
            console.error('Error logging in client:', error);
            throw error;
        }
    }
};
