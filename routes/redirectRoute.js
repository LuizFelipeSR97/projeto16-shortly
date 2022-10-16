import express from 'express';
import { redirect } from '../controllers/redirectController.js';

const router = express.Router();

router.get('/urls/open/:shortUrl', redirect)

export default router;