import express from 'express';
import { postUrl } from '../controllers/postUrlController.js';
import {validateAuthorization} from '../middlewares/authorization.js';
import {urlValidation} from '../middlewares/validations.js';
import {solveCorsProblem} from '../middlewares/solveCorsProblem.js';

const router = express.Router();

router.post('/urls/shorten', solveCorsProblem, validateAuthorization, urlValidation, postUrl)

export default router;