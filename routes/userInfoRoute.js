import express from 'express';
import { userInfo } from '../controllers/userInfoController.js';
import {validateAuthorization} from '../middlewares/authorization.js';
import {solveCorsProblem} from '../middlewares/solveCorsProblem.js';

const router = express.Router();

router.get('/users/me', solveCorsProblem, validateAuthorization, userInfo)

export default router;