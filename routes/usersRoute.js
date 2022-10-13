import express from 'express';
import { signUpPost } from '../controllers/usersControllers.js';
import {signUpValidation} from '../middlewares/validations.js';

const router = express.Router();

router.post('/signup', signUpValidation, signUpPost)

export default router;