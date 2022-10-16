import express from 'express';
import { deleteUrl } from '../controllers/deleteUrlController.js';
import {validateAuthorization} from '../middlewares/authorization.js';

const router = express.Router();

router.delete('/urls/:id', validateAuthorization, deleteUrl)

export default router;