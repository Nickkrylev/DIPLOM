// gameRouter.js
import { Router } from 'express';
import gameController from '../controler/gameControler.js';  // Make sure the import path is correct based on your project structure

const router = Router();

// Route to fetch all games
router.get('/all', gameController.getAllGames);

// Route to get a game by ID
router.get('/:gameId', gameController.getGameById);

// Route to create a new game
router.post('/new', gameController.createGame);

// Route to delete a game by ID
router.delete('/:gameId', gameController.deleteGame);

export default router;
