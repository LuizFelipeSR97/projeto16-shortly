import express from 'express';
import { signIn } from '../controllers/usersControllers.js';
import {signInValidation} from '../middlewares/validations.js';

const router = express.Router();

router.post('/signin', signInValidation, signIn)

export default router;