import { Router } from 'express';
import UserController from '../../app/controllers/user.controller';
import { CreateUserDto } from '../../app/dto/auth/create-user.dto';
import permission from '../../app/middlewares/permission';
import validation from '../../app/middlewares/validate-dto';
import Call from '../../app/utils/Call';

const router = Router();
router.get('/', [permission('ROLE_USER_LIST')], Call(UserController, 'index'));
router.post('/', [permission('ROLE_USER_CREATE'), validation(CreateUserDto)], Call(UserController, 'store'));
router.get('/details', Call(UserController, 'showLoggedUser'));
export default router;
