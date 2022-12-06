import { Router } from 'express';
import routesPermissions from './api/permissions';
import UserController from '../app/controllers/user.controller';
import Call from '../app/utils/Call';
import validation from '../app/middlewares/validate-dto';
import { CreateUserDto } from '../app/dto/auth/create-user.dto';
import RouteController from '../app/controllers/route.controller';
import Auth from '../app/middlewares/auth';
import { LoginDto } from '../app/dto/auth/login.dto';
import AuthController from '../app/controllers/auth.controller';
import routesBooks from './api/books';
import routesCheckout from './api/checkout';

const router = Router();
router.post('/v1/login', validation(LoginDto), Call(AuthController, 'login'));
router.use('/v1/permissions', routesPermissions);
router.post('/v1/users', validation(CreateUserDto), Call(UserController, 'store'));
router.get('/v1/routes', [Auth], Call(RouteController, 'index'));
router.use('/v1/books', [Auth], routesBooks);
router.use('/v1/checkouts', [Auth], routesCheckout);

export default router;