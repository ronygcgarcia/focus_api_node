import { Router } from 'express';
import GenreController from '../../app/controllers/genres.controller';
import Call from '../../app/utils/Call';

const router = Router();
router.get('/', Call(GenreController, 'index'));

export default router;
