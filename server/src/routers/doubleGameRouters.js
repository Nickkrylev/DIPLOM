import { Router } from 'express';
import duelGameController from '../controler/doubleGameControler.js';  // Adjust the import path as necessary
const router = Router();
router.get('/duels', duelGameController.getAllDuelGames);
router.get('/duels/:id', duelGameController.getDuelGameById);
router.post('/duels', duelGameController.createDuelGame);

export default router;