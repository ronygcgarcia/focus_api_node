import { Router } from 'express';
import ProfileController from '../../app/controllers/profile.controller';
import permission from '../../app/middlewares/permission';
import Call from '../../app/utils/Call';

const router = Router();
router.get('/', [permission('ROLE_PROFILE_LIST')], Call(ProfileController, 'index'));

export default router;
