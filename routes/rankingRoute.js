import express from 'express';
import { ranking } from '../controllers/rankingController.js';
import {solveCorsProblem} from '../middlewares/solveCorsProblem.js';

const router = express.Router();

router.get('/ranking', solveCorsProblem, ranking)

export default router;