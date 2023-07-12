'use strict';

import * as express from 'express';
import * as formController from '../controllers/form.controller.js';

const router = express.Router();

router.get('/', formController.listForm);
router.get('/:formId', formController.getSingleForm);
router.post('/', formController.createForm);
router.put('/:formId', formController.editForm);
router.delete('/:formId', formController.deleteForm);

export default router;
