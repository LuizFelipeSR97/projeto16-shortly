import express from 'express';
import { signUp } from '../controllers/usersControllers.js';
import {signUpValidation} from '../middlewares/validations.js';

const router = express.Router();

router.post('/signup', signUpValidation, signUp)

export default router;