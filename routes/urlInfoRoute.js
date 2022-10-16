import express from 'express';
import { urlInfo } from '../controllers/urlInfoController.js';

const router = express.Router();

router.get('/urls/:id', urlInfo)

export default router;