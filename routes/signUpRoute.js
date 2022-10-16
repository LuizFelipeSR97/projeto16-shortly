import express from 'express';
import { signUp } from '../controllers/usersControllers.js';
import {signUpValidation} from '../middlewares/validations.js';
import {solveCorsProblem} from '../middlewares/solveCorsProblem.js';

const router = express.Router();

router.post('/signup', solveCorsProblem, signUpValidation, signUp)

export default router;