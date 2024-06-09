import { Router } from 'express';
import clientController from '../controllers/clientController.js';

const router = Router();

// Route to fetch all clients
router.get('/all', clientController.getAllClients);

// Route to get a client by ID
router.get('/:id', clientController.getClientById);

// Route to get a client by email
router.get('/email/:email', clientController.getClientByEmail);

// Route to create a new client
router.post('/new', clientController.createClient);

// Route to update a client by ID
router.put('/:id', clientController.updateClient);

// Route to delete a client by ID
router.delete('/:id', clientController.deleteClient);

// Route for client login
router.post('/login', clientController.loginClient);

export default router;
