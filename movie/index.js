import { Router } from 'express';
import {
  listAction,
  removeAction,
  formAction,
  saveAction,
  rateMovie,
} from './controller.js';

const router = Router();

router.get('/', listAction);
router.get('/delete/:id', removeAction);
router.get('/form/:id?', formAction);
router.post('/save', saveAction);
router.get('/rate/:movie/:rating', rateMovie);

export { router };