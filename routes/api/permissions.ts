import { Router } from 'express';
import PermissionController from '../../app/controllers/permission.controller';
import Call from '../../app/utils/Call';

const router = Router();
router.get('/', Call(PermissionController, 'index'));
router.post('/', Call(PermissionController, 'createPermission'));
router.get('/:id_permission', Call(PermissionController, 'showPermission'));


export default router;
