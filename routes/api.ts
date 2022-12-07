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
import routesProfile from './api/profiles';
import { LoginDto } from '../app/dto/auth/login.dto';

const router = Router();
router.post('/v1/login', validation(LoginDto), Call(AuthController, 'login'));
router.use('/v1/permissions', [Auth], routesPermissions);
router.use('/v1/users', [Auth], routesUser);
router.get('/v1/routes', [Auth], Call(RouteController, 'index'));
router.use('/v1/books', routesBooks);
router.use('/v1/checkouts', [Auth], routesCheckout);
router.use('/v1/genres', [Auth], routesGenres);
router.use('/v1/profiles', [Auth], routesProfile);

export default router;