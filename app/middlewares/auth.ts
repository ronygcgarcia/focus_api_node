import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import moment from 'moment';
import NoAuthException from '../../handlers/NoAuthException';
import UsuarioService from '../services/usuario.service';
import { Request, Response, NextFunction } from 'express';
import InternalServerException from '../../handlers/InternalServerException';
import IUsuario from '../interfaces/IUsuario';
import { Container } from 'typedi';
import Security from '../utils/Security';

interface ITokenPayload extends JwtPayload {
  user: IUsuario,
  iat: number
}

const Auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new NoAuthException();

    const token = authorization.replace('Bearer ', '');

    const { user, iat } = jwt.verify(token, process.env.SECRET_KEY as Secret) as ITokenPayload;
    const fechaCreacionToken = iat * 1000;

    const usuarioService = Container.get(UsuarioService);
    const usuario = await usuarioService.getUser(user.id);

    if (!usuario) throw new NoAuthException();

    const frontAdmin = (process.env.FRONT_ADMIN_HOST as string).split('||');
    if (frontAdmin.includes(req.headers.origin as string)) {
      if (!(await Security.isGranted(usuario.id, 'ROLE_USER_ADMIN'))) throw new NoAuthException();
    }

    const fechaValidacionToken = moment(usuario.token_valid_after).valueOf();

    if (fechaValidacionToken > fechaCreacionToken) throw new NoAuthException();

    req.usuario = usuario;

    next();
  } catch (err) {
    throw new InternalServerException();
  }
};

export default Auth;
