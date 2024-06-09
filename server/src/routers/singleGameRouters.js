import { Router } from 'express';

import singleGameController from '../controler/singleGameControler.js';  // Adjust the import path as necessary

const router = Router();



// Routes for Single Player Games
router.get('/singles', singleGameController.getAllSingleGames);
router.get('/singles/:id', singleGameController.getSingleGameById);
router.post('/singles', singleGameController.createSingleGame);

export default router;
