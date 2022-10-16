import express from 'express';
import { signIn } from '../controllers/usersControllers.js';
import {signInValidation} from '../middlewares/validations.js';
import {solveCorsProblem} from '../middlewares/solveCorsProblem.js';

const router = express.Router();

router.post('/signin', solveCorsProblem, signInValidation, signIn)

export default router;