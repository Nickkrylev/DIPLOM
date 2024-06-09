import sellerService from '../services/seller';

export default {
    async getAllBuyers(req, res) {
        try {
            const buyers = await sellerService.getAllBuyers();
            res.status(200).json(buyers);
        } catch (error) {
            console.error('Failed to retrieve buyers:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getBuyerById(req, res) {
        try {
            const { id } = req.params;
            const buyer = await sellerService.getBuyerById(id);
            if (!buyer) {
                return res.status(404).json({ error: 'Buyer not found' });
            }
            res.status(200).json(buyer);
        } catch (error) {
            console.error('Failed to retrieve buyer:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async createBuyer(req, res) {
        try {
            const newBuyer = await sellerService.createBuyer(req.body);
            res.status(201).json(newBuyer);
        } catch (error) {
            console.error('Failed to create buyer:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async updateBuyer(req, res) {
        try {
            const { id } = req.params;
            const updatedBuyer = await sellerService.updateBuyer(id, req.body);
            if (!updatedBuyer) {
                return res.status(404).json({ error: 'Buyer not found' });
            }
            res.status(200).json(updatedBuyer);
        } catch (error) {
            console.error('Failed to update buyer:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async deleteBuyer(req, res) {
        try {
            const { id } = req.params;
            const deleteResult = await sellerService.deleteBuyer(id);
            if (!deleteResult) {
                return res.status(404).json({ error: 'Buyer not found' });
            }
            res.status(200).json({ message: 'Buyer deleted successfully' });
        } catch (error) {
            console.error('Failed to delete buyer:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async sellerLogEmail(req, res) {
        try {
            const loginData = req.body;
            const loginResponse = await sellerService.sellerLogEmail(loginData);
            res.status(200).json(loginResponse);
        } catch (error) {
            if (error.response?.status === 404 && error.response?.data?.error === 'Admin not found') {
                return res.status(404).json({ error: 'Admin not found' });
            }
            console.error('Failed to log in admin:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
