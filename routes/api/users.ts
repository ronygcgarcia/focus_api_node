import { Router } from 'express';
import UserController from '../../app/controllers/user.controller';
import permission from '../../app/middlewares/permission';
import validation from '../../app/middlewares/validate';
import userCreate from '../../app/schemas/user/user-create';
import Call from '../../app/utils/Call';

const router = Router();
router.get('/', [permission('ROLE_USER_LIST')], Call(UserController, 'index'));
router.post('/', [permission('ROLE_USER_CREATE'), validation(userCreate)], Call(UserController, 'store'));
router.get('/details', Call(UserController, 'showLoggedUser'));
export default router;
