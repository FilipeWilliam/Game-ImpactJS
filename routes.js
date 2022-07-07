import express from 'express';
import AuthController from "./controllers/AuthController.js";
import RankingController from './controllers/RankingController.js';
import FinishMatchController from './controllers/FinishMatchController.js';

const router = express.Router();
//Others

router.post('/auth', new AuthController().handle);
router.get('/ranking', new RankingController().handle);
router.post('/finish', new FinishMatchController().handle);


export default router;