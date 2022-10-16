import express from 'express';
import { redirect } from '../controllers/redirectController.js';
import {solveCorsProblem} from '../middlewares/solveCorsProblem.js';

const router = express.Router();

router.get('/urls/open/:shortUrl', solveCorsProblem, redirect)

export default router;