import { Router } from 'express';
import routesRoles from './api/rol';
import UsuarioController from '../app/controllers/usuario.controller';
import Call from '../app/utils/Call';
import validation from '../app/middlewares/validate-dto';
import { CreateUserDto } from '../app/dto/create-user.dto';

const router = Router();
router.use('/v1/roles', routesRoles);
router.post('/v1/user', validation(CreateUserDto), Call(UsuarioController, 'store'));

export default router;