import { Router } from 'express';
import UserController from '../../app/controllers/user.controller';
import { CreateUserDto } from '../../app/dto/auth/create-user.dto';
import validation from '../../app/middlewares/validate-dto';
import Call from '../../app/utils/Call';

const router = Router();
router.get('/', Call(UserController, 'index'));
router.post('/', validation(CreateUserDto), Call(UserController, 'store'));

export default router;
