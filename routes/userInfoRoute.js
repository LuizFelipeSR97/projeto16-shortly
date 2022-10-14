import express from 'express';
import { userInfo } from '../controllers/userInfoController.js';
import {validateAuthorization} from '../middlewares/authorization.js';

const router = express.Router();

router.get('/users/me', validateAuthorization, userInfo)

export default router;