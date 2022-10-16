import express from 'express';
import { urlInfo } from '../controllers/urlInfoController.js';
import {solveCorsProblem} from '../middlewares/solveCorsProblem.js';

const router = express.Router();

router.get('/urls/:id', solveCorsProblem, urlInfo)

export default router;