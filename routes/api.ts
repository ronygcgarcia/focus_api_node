import { Router } from 'express';
import routesPermissions from './api/permissions';
import Call from '../app/utils/Call';
import validation from '../app/middlewares/validate-dto';
import RouteController from '../app/controllers/route.controller';
import Auth from '../app/middlewares/auth';
import AuthController from '../app/controllers/auth.controller';
import routesBooks from './api/books';
import routesCheckout from './api/checkout';
import routesGenres from './api/genres';
import routesUser from './api/users';
import { LoginDto } from '../app/dto/auth/login.dto';

const router = Router();
router.post('/v1/login', validation(LoginDto), Call(AuthController, 'login'));
router.use('/v1/permissions', routesPermissions);
router.use('/v1/users', [Auth], routesUser);
router.get('/v1/routes', [Auth], Call(RouteController, 'index'));
router.use('/v1/books', [Auth], routesBooks);
router.use('/v1/checkouts', [Auth], routesCheckout);
router.use('/v1/genres', routesGenres);

export default router;