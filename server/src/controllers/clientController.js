import clientService from '../services/client.js';

export default {
    async getAllClients(req, res) {
        try {
            const clients = await clientService.getAllClients();
            res.status(200).json(clients);
        } catch (error) {
            console.error('Failed to retrieve clients:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getClientById(req, res) {
        try {
            const { id } = req.params;
            const client = await clientService.getClientById(id);
            if (!client) {
                return res.status(404).json({ error: 'Client not found' });
            }
            res.status(200).json(client);
        } catch (error) {
            console.error('Failed to retrieve client by ID:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getClientByEmail(req, res) {
        try {
            const { email } = req.params;
            const client = await clientService.getClientByEmail(email);
            if (!client) {
                return res.status(404).json({ error: 'Client not found' });
            }
            res.status(200).json(client);
        } catch (error) {
            console.error('Failed to retrieve client by email:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createClient(req, res) {
        try {
            const newClient = await clientService.createClient(req.body);
            res.status(201).json(newClient);
        } catch (error) {
            if (error.message === 'Email already exists') {
                res.status(409).json({ error: 'Email already exists' });
            } else {
                console.error('Failed to create client:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    },

    async updateClient(req, res) {
        try {
            const { id } = req.params;
            const updatedClient = await clientService.updateClient(id, req.body);
            if (!updatedClient) {
                return res.status(404).json({ error: 'Client not found' });
            }
            res.status(200).json(updatedClient);
        } catch (error) {
            console.error('Failed to update client:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteClient(req, res) {
        try {
            const { id } = req.params;
            const deleted = await clientService.deleteClient(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Client not found' });
            }
            res.status(200).json({ message: 'Client deleted successfully' });
        } catch (error) {
            console.error('Failed to delete client:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async loginClient(req, res) {
        try {
            const { email, password } = req.body;
            const client = await clientService.loginClient(email, password);
            res.status(200).json(client);
        } catch (error) {
            if (error.message === 'Client not found' || error.message === 'Invalid credentials') {
                res.status(401).json({ error: error.message });
            } else {
                console.error('Failed to login client:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
};
