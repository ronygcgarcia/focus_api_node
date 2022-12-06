import { Router } from 'express';
import ProfileController from '../../app/controllers/profile.controller';
import Call from '../../app/utils/Call';

const router = Router();
router.get('/', Call(ProfileController, 'index'));

export default router;
