import { Router } from 'express';
import userController from '../controler/userControler';  // Make sure the import path is correct based on your project structure

const router = Router();

// Get all users
router.get('/all', userController.getUsers);

// Get a single user by email
router.get('/email/:email', userController.getUserByEmail);  // Assuming email is passed as a URL parameter

// Create a new user
router.post('/new', userController.createUser);

// Endpoint for user login isn't fully defined in your controller. Assuming you need an actual login logic.
// Typically, a login would require finding the user by credentials, verifying the password, and perhaps issuing a token.
// Here's a placeholder that you might use for a login using email (adjust according to your authentication logic).
router.post('/login', userController.getUserByEmail);



export default router;
