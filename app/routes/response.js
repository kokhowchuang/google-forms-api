import * as express from 'express';
import * as responseController from '../controllers/response.controller.js';

const router = express.Router();

router.post('/', responseController.addResponse);

export default router;
