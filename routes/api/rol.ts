import { Router } from 'express';
import RolController from '../../app/controllers/rol.controller';
import Call from '../../app/utils/Call';

const router = Router();
router.get('/', Call(RolController, 'index'));
router.post('/', Call(RolController, 'createRole'));
router.get('/:id_role', Call(RolController, 'showRole'));


export default router;
