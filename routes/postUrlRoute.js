import express from 'express';
import { postUrl } from '../controllers/postUrlController.js';
import {validateAuthorization} from '../middlewares/authorization.js';
import {urlValidation} from '../middlewares/validations.js';

const router = express.Router();

router.post('/urls/shorten', urlValidation, validateAuthorization, postUrl)

export default router;