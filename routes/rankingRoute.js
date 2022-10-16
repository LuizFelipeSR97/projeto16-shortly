import express from 'express';
import { ranking } from '../controllers/rankingController.js';

const router = express.Router();

router.get('/ranking', ranking)

export default router;