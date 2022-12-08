import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import NoAuthException from '../../handlers/NoAuthException';
import UsuarioService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import IUser from '../interfaces/IUser';
import { Container } from 'typedi';
import Handler from '../../handlers/Handler';

interface ITokenPayload extends JwtPayload {
  user: IUser,
  iat: number
}

const Auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    
    if (!authorization) throw new NoAuthException();

    const token = authorization.replace('Bearer ', '');

    const { user } = jwt.verify(token, process.env.SECRET_KEY || 'clave_secreta') as ITokenPayload;

    const usuarioService = Container.get(UsuarioService);
    const userResult = await usuarioService.getUser(user.id);

    if (!userResult) throw new NoAuthException();

    req.user = userResult;

    next();
  } catch (err) {
    Handler.handle(err, req, res, next);
  }
};

export default Auth;
