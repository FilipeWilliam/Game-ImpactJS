import express from 'express';
import AuthController from "./controllers/AuthController.js";
import RankingController from './controllers/RankingController.js';

const router = express.Router();
//Others

router.post('/auth', new AuthController().handle);
router.get('/ranking', new RankingController().handle);
// router.post('/win', new WinController().handle);
// router.post('/defeat', new DefeatController().handle);


export default router;